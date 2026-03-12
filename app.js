document.addEventListener("DOMContentLoaded", () => {
  renderFBSChart();
  renderConferenceFilters();
  renderSchoolGrid(SCHOOLS);
  setupSearch();
  setupModal();
});

// --- FBS Revenue Doughnut ---
function renderFBSChart() {
  const ctx = document.getElementById("fbs-revenue-chart").getContext("2d");
  const src = FBS_AGGREGATE.sources;
  const keys = Object.keys(src);
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: keys.map(k => src[k].label),
      datasets: [{
        data: keys.map(k => src[k].value),
        backgroundColor: keys.map(k => src[k].color),
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1a1a26",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#e4e4e7",
          bodyColor: "#a1a1aa",
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => ` $${ctx.parsed.toLocaleString()}M (${src[keys[ctx.dataIndex]].pct}%)`
          }
        }
      }
    }
  });

  const legend = document.getElementById("fbs-revenue-legend");
  legend.innerHTML = keys.map(k => {
    const s = src[k];
    return `<div class="legend-item">
      <div class="legend-dot" style="background:${s.color}"></div>
      <div>
        <div class="legend-value">$${s.value.toLocaleString()}M</div>
        <div class="legend-label">${s.label}</div>
      </div>
      <div class="legend-pct">${s.pct}%</div>
    </div>`;
  }).join("");
}

// --- Conference Filter Buttons ---
let activeConf = "All";

function renderConferenceFilters() {
  const el = document.getElementById("conference-filters");
  el.innerHTML = `<button class="conf-btn active" data-conf="All">All</button>` +
    CONFERENCES.map(c => `<button class="conf-btn" data-conf="${c}">${c}</button>`).join("");

  el.addEventListener("click", (e) => {
    if (!e.target.classList.contains("conf-btn")) return;
    el.querySelectorAll(".conf-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    activeConf = e.target.dataset.conf;
    filterAndRender();
  });
}

function filterAndRender() {
  const query = document.getElementById("school-search").value.toLowerCase();
  let filtered = SCHOOLS;
  if (activeConf !== "All") filtered = filtered.filter(s => s.conf === activeConf);
  if (query) filtered = filtered.filter(s => s.name.toLowerCase().includes(query) || s.conf.toLowerCase().includes(query));
  renderSchoolGrid(filtered);
}

function setupSearch() {
  document.getElementById("school-search").addEventListener("input", filterAndRender);
}

// --- School Cards ---
function renderSchoolGrid(schools) {
  const grid = document.getElementById("school-grid");
  if (schools.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted)">No schools match your search.</div>`;
    return;
  }
  grid.innerHTML = schools.map(s => {
    const donorM = (s.totalRev * s.donorPct / 100);
    const instM = (s.totalRev * s.instPct / 100);
    const isIvy = s.division === "FCS";
    const divBadge = isIvy ? `<span class="card-div-badge">FCS</span>` : "";
    const subsidyLabel = isIvy ? "Subsidy*" : "School";
    const donorStat = isIvy
      ? `<div class="card-stat"><div class="stat-dot school"></div><div><div class="stat-val">${s.instPct}%</div><div class="stat-label">${subsidyLabel}</div></div></div>`
      : `<div class="card-stat"><div class="stat-dot donors"></div><div><div class="stat-val">${s.donorPct}%</div><div class="stat-label">Donors</div></div></div>
        <div class="card-stat"><div class="stat-dot school"></div><div><div class="stat-val">${s.instPct}%</div><div class="stat-label">School</div></div></div>`;
    return `<div class="school-card" data-school="${s.name}">
      <div class="card-top">
        <div class="card-school-name">${s.name} ${divBadge}</div>
        <div class="card-conf">${s.conf}</div>
      </div>
      <div class="card-bar">
        <div class="bar-donors" style="width:${s.donorPct}%"></div>
        <div class="bar-school" style="width:${s.instPct}%"></div>
        <div class="bar-self" style="width:${s.selfPct}%"></div>
      </div>
      <div class="card-stats">
        ${donorStat}
        <div class="card-stat"><div class="stat-dot self"></div><div><div class="stat-val">${s.selfPct}%</div><div class="stat-label">${isIvy ? "Sport-Alloc" : "Self-Gen"}</div></div></div>
      </div>
      <div class="card-footer">
        <div class="card-revenue">Total Rev: <span>$${s.totalRev.toFixed(1)}M</span></div>
        <div class="card-football">Football Share: <span>${s.footballSharePct}%</span></div>
      </div>
      ${isIvy ? '<div class="card-ivy-note">*Subsidy = donors + institutional (EADA does not separate)</div>' : ''}
    </div>`;
  }).join("");
}

// --- Modal ---
let schoolRevenueChart = null;
let schoolFootballChart = null;

function setupModal() {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");

  document.getElementById("school-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".school-card");
    if (!card) return;
    const schoolName = card.dataset.school;
    const school = SCHOOLS.find(s => s.name === schoolName);
    if (school) openModal(school);
  });

  closeBtn.addEventListener("click", () => overlay.classList.remove("active"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });
}

function openModal(s) {
  const overlay = document.getElementById("modal-overlay");
  const header = document.getElementById("modal-header");
  const stats = document.getElementById("modal-stats");

  const donorM = (s.totalRev * s.donorPct / 100);
  const instM = (s.totalRev * s.instPct / 100);
  const selfM = (s.totalRev * s.selfPct / 100);
  const footballSpend = (s.totalRev * s.footballSharePct / 100);
  const fbDonor = (donorM * s.footballSharePct / 100);
  const fbInst = (instM * s.footballSharePct / 100);
  const fbSelf = (selfM * s.footballSharePct / 100);

  const totalFbFunding = fbDonor + fbInst + fbSelf;
  const fbDonorPct = (fbDonor / totalFbFunding * 100).toFixed(1);
  const fbInstPct = (fbInst / totalFbFunding * 100).toFixed(1);
  const fbSelfPct = (fbSelf / totalFbFunding * 100).toFixed(1);

  const divLabel = s.division === "FCS" ? " (FCS)" : "";
  header.innerHTML = `
    <h2>${s.name}${divLabel}</h2>
    <div class="modal-sub">${s.conf}${s.division === "FCS" ? "" : " Conference"} &middot; FY 2024 &middot; Total Revenue: $${s.totalRev.toFixed(1)}M</div>`;

  stats.innerHTML = `
    <div class="modal-stat">
      <div class="modal-stat-label">Donor Contributions</div>
      <div class="modal-stat-value" style="color:#818cf8">$${donorM.toFixed(1)}M</div>
      <div class="modal-stat-sub">${s.donorPct}% of department revenue</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">School/Gov Support</div>
      <div class="modal-stat-value" style="color:#fbbf24">$${instM.toFixed(1)}M</div>
      <div class="modal-stat-sub">${s.instPct}% of department revenue</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Self-Generated</div>
      <div class="modal-stat-value" style="color:#4ade80">$${selfM.toFixed(1)}M</div>
      <div class="modal-stat-sub">${s.selfPct}% (tickets, media, sponsors)</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Est. Football Spending</div>
      <div class="modal-stat-value">$${footballSpend.toFixed(1)}M</div>
      <div class="modal-stat-sub">${s.footballSharePct}% of total athletic budget</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Est. FB Donor Funding</div>
      <div class="modal-stat-value" style="color:#818cf8">$${fbDonor.toFixed(1)}M</div>
      <div class="modal-stat-sub">${fbDonorPct}% of football funding</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">Est. FB School Funding</div>
      <div class="modal-stat-value" style="color:#fbbf24">$${fbInst.toFixed(1)}M</div>
      <div class="modal-stat-sub">${fbInstPct}% of football funding</div>
    </div>`;

  // Revenue sources chart
  if (schoolRevenueChart) schoolRevenueChart.destroy();
  const ctx1 = document.getElementById("school-revenue-chart").getContext("2d");
  schoolRevenueChart = new Chart(ctx1, {
    type: "doughnut",
    data: {
      labels: ["Donor Contributions", "School/Gov Support", "Self-Generated"],
      datasets: [{
        data: [donorM, instM, selfM],
        backgroundColor: ["#6366f1", "#f59e0b", "#22c55e"],
        borderWidth: 0, hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "58%",
      plugins: {
        legend: { display: true, position: "bottom", labels: { color: "#a1a1aa", padding: 12, boxWidth: 12, font: { size: 11 } } },
        tooltip: {
          backgroundColor: "#1a1a26", borderColor: "rgba(255,255,255,0.1)", borderWidth: 1,
          titleColor: "#e4e4e7", bodyColor: "#a1a1aa", padding: 10, cornerRadius: 8,
          callbacks: { label: (ctx) => ` $${ctx.parsed.toFixed(1)}M` }
        }
      }
    }
  });

  // Football funding chart
  if (schoolFootballChart) schoolFootballChart.destroy();
  const ctx2 = document.getElementById("school-football-chart").getContext("2d");
  schoolFootballChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Donors", "School/Gov", "Self-Generated"],
      datasets: [{
        data: [fbDonor, fbInst, fbSelf],
        backgroundColor: ["#6366f1", "#f59e0b", "#22c55e"],
        borderRadius: 6, borderSkipped: false, barPercentage: 0.6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, indexAxis: "y",
      scales: {
        x: { grid: { color: "rgba(255,255,255,0.04)" }, ticks: { color: "#71717a", font: { size: 11 }, callback: (v) => `$${v}M` } },
        y: { grid: { display: false }, ticks: { color: "#a1a1aa", font: { size: 11 } } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1a1a26", borderColor: "rgba(255,255,255,0.1)", borderWidth: 1,
          titleColor: "#e4e4e7", bodyColor: "#a1a1aa", padding: 10, cornerRadius: 8,
          callbacks: { label: (ctx) => ` $${ctx.parsed.x.toFixed(1)}M` }
        }
      }
    }
  });

  overlay.classList.add("active");
}
