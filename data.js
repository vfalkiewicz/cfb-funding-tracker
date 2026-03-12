const FBS_AGGREGATE = {
  totalRevenue: 11794.49,
  sources: {
    conferenceNcaaMedia: { value: 3137.22, pct: 27, label: "Conference/NCAA/Media", color: "#22c55e" },
    donorContributions:  { value: 2591.21, pct: 22, label: "Donor Contributions", color: "#6366f1" },
    ticketSales:         { value: 1764.55, pct: 15, label: "Ticket Sales", color: "#3b82f6" },
    institutionalSupport:{ value: 1600.66, pct: 14, label: "Institutional/Gov Support", color: "#f59e0b" },
    corporateSponsors:   { value: 961.67,  pct: 8,  label: "Corp Sponsorship/Licensing", color: "#8b5cf6" },
    otherRevenue:        { value: 931.57,  pct: 8,  label: "Other Revenue", color: "#64748b" },
    studentFees:         { value: 643.05,  pct: 5,  label: "Student Fees", color: "#ef4444" },
    competitionGuarantees:{ value: 164.56, pct: 1,  label: "Competition Guarantees", color: "#14b8a6" }
  }
};

// Per-school data: compiled from public reporting, CNBC valuations, Knight-Newhouse aggregate data,
// USA TODAY athletics finances database, and news articles. All figures in millions (FY2024).
// donorPct + instPct + selfPct = 100 (department-wide revenue breakdown)
// footballSharePct = football spending as % of total athletic spending
const SCHOOLS = [
  { name: "Ohio State", conf: "Big Ten", totalRev: 279.3, donorPct: 18, instPct: 2, selfPct: 80, footballSharePct: 38 },
  { name: "Texas", conf: "SEC", totalRev: 271.8, donorPct: 20, instPct: 1, selfPct: 79, footballSharePct: 40 },
  { name: "Michigan", conf: "Big Ten", totalRev: 243.5, donorPct: 19, instPct: 3, selfPct: 78, footballSharePct: 37 },
  { name: "Georgia", conf: "SEC", totalRev: 228.6, donorPct: 24, instPct: 2, selfPct: 74, footballSharePct: 42 },
  { name: "Alabama", conf: "SEC", totalRev: 222.8, donorPct: 22, instPct: 3, selfPct: 75, footballSharePct: 45 },
  { name: "Texas A&M", conf: "SEC", totalRev: 218.4, donorPct: 28, instPct: 2, selfPct: 70, footballSharePct: 41 },
  { name: "Penn State", conf: "Big Ten", totalRev: 215.1, donorPct: 17, instPct: 4, selfPct: 79, footballSharePct: 36 },
  { name: "Oregon", conf: "Big Ten", totalRev: 197.2, donorPct: 21, instPct: 5, selfPct: 74, footballSharePct: 39 },
  { name: "LSU", conf: "SEC", totalRev: 196.8, donorPct: 23, instPct: 4, selfPct: 73, footballSharePct: 43 },
  { name: "Oklahoma", conf: "SEC", totalRev: 191.4, donorPct: 20, instPct: 5, selfPct: 75, footballSharePct: 40 },
  { name: "Florida", conf: "SEC", totalRev: 188.2, donorPct: 22, instPct: 3, selfPct: 75, footballSharePct: 38 },
  { name: "Tennessee", conf: "SEC", totalRev: 186.5, donorPct: 25, instPct: 4, selfPct: 71, footballSharePct: 44 },
  { name: "Auburn", conf: "SEC", totalRev: 179.3, donorPct: 26, instPct: 5, selfPct: 69, footballSharePct: 43 },
  { name: "Wisconsin", conf: "Big Ten", totalRev: 175.8, donorPct: 15, instPct: 6, selfPct: 79, footballSharePct: 35 },
  { name: "Iowa", conf: "Big Ten", totalRev: 173.2, donorPct: 16, instPct: 7, selfPct: 77, footballSharePct: 34 },
  { name: "South Carolina", conf: "SEC", totalRev: 168.4, donorPct: 23, instPct: 6, selfPct: 71, footballSharePct: 40 },
  { name: "Clemson", conf: "ACC", totalRev: 167.9, donorPct: 27, instPct: 4, selfPct: 69, footballSharePct: 44 },
  { name: "Michigan State", conf: "Big Ten", totalRev: 162.3, donorPct: 17, instPct: 8, selfPct: 75, footballSharePct: 33 },
  { name: "Arkansas", conf: "SEC", totalRev: 160.1, donorPct: 24, instPct: 7, selfPct: 69, footballSharePct: 42 },
  { name: "Nebraska", conf: "Big Ten", totalRev: 157.8, donorPct: 18, instPct: 5, selfPct: 77, footballSharePct: 36 },
  { name: "Kentucky", conf: "SEC", totalRev: 155.2, donorPct: 21, instPct: 8, selfPct: 71, footballSharePct: 37 },
  { name: "Minnesota", conf: "Big Ten", totalRev: 151.4, donorPct: 14, instPct: 10, selfPct: 76, footballSharePct: 32 },
  { name: "Florida State", conf: "ACC", totalRev: 150.8, donorPct: 22, instPct: 6, selfPct: 72, footballSharePct: 41 },
  { name: "Virginia Tech", conf: "ACC", totalRev: 118.5, donorPct: 20, instPct: 12, selfPct: 68, footballSharePct: 38 },
  { name: "NC State", conf: "ACC", totalRev: 116.2, donorPct: 18, instPct: 14, selfPct: 68, footballSharePct: 36 },
  { name: "Mississippi State", conf: "SEC", totalRev: 142.6, donorPct: 25, instPct: 8, selfPct: 67, footballSharePct: 42 },
  { name: "Ole Miss", conf: "SEC", totalRev: 148.3, donorPct: 28, instPct: 5, selfPct: 67, footballSharePct: 44 },
  { name: "Missouri", conf: "SEC", totalRev: 138.7, donorPct: 19, instPct: 9, selfPct: 72, footballSharePct: 38 },
  { name: "Indiana", conf: "Big Ten", totalRev: 131.6, donorPct: 14, instPct: 13, selfPct: 73, footballSharePct: 30 },
  { name: "Maryland", conf: "Big Ten", totalRev: 128.4, donorPct: 13, instPct: 18, selfPct: 69, footballSharePct: 31 },
  { name: "Illinois", conf: "Big Ten", totalRev: 126.5, donorPct: 15, instPct: 12, selfPct: 73, footballSharePct: 33 },
  { name: "Purdue", conf: "Big Ten", totalRev: 122.8, donorPct: 16, instPct: 11, selfPct: 73, footballSharePct: 32 },
  { name: "Iowa State", conf: "Big 12", totalRev: 115.3, donorPct: 18, instPct: 12, selfPct: 70, footballSharePct: 35 },
  { name: "Kansas State", conf: "Big 12", totalRev: 110.7, donorPct: 20, instPct: 14, selfPct: 66, footballSharePct: 37 },
  { name: "Oklahoma State", conf: "Big 12", totalRev: 114.6, donorPct: 22, instPct: 10, selfPct: 68, footballSharePct: 38 },
  { name: "West Virginia", conf: "Big 12", totalRev: 102.4, donorPct: 17, instPct: 16, selfPct: 67, footballSharePct: 36 },
  { name: "Baylor", conf: "Big 12", totalRev: 108.2, donorPct: 24, instPct: 8, selfPct: 68, footballSharePct: 40 },
  { name: "Arizona State", conf: "Big 12", totalRev: 119.8, donorPct: 16, instPct: 12, selfPct: 72, footballSharePct: 35 },
  { name: "Arizona", conf: "Big 12", totalRev: 112.5, donorPct: 17, instPct: 14, selfPct: 69, footballSharePct: 34 },
  { name: "Colorado", conf: "Big 12", totalRev: 117.3, donorPct: 18, instPct: 11, selfPct: 71, footballSharePct: 37 },
  { name: "Utah", conf: "Big 12", totalRev: 109.6, donorPct: 16, instPct: 15, selfPct: 69, footballSharePct: 36 },
  { name: "UCF", conf: "Big 12", totalRev: 95.4, donorPct: 14, instPct: 20, selfPct: 66, footballSharePct: 34 },
  { name: "Houston", conf: "Big 12", totalRev: 93.8, donorPct: 15, instPct: 18, selfPct: 67, footballSharePct: 33 },
  { name: "Cincinnati", conf: "Big 12", totalRev: 88.2, donorPct: 13, instPct: 22, selfPct: 65, footballSharePct: 32 },
  { name: "Louisville", conf: "ACC", totalRev: 112.8, donorPct: 18, instPct: 14, selfPct: 68, footballSharePct: 37 },
  { name: "Pittsburgh", conf: "ACC", totalRev: 105.6, donorPct: 16, instPct: 16, selfPct: 68, footballSharePct: 35 },
  { name: "UNC", conf: "ACC", totalRev: 124.5, donorPct: 20, instPct: 10, selfPct: 70, footballSharePct: 34 },
  { name: "Virginia", conf: "ACC", totalRev: 114.3, donorPct: 19, instPct: 13, selfPct: 68, footballSharePct: 33 },
  { name: "Washington", conf: "Big Ten", totalRev: 143.7, donorPct: 18, instPct: 8, selfPct: 74, footballSharePct: 36 },
  { name: "UCLA", conf: "Big Ten", totalRev: 138.9, donorPct: 16, instPct: 10, selfPct: 74, footballSharePct: 33 },
  { name: "Oregon State", conf: "Pac-12", totalRev: 82.4, donorPct: 15, instPct: 22, selfPct: 63, footballSharePct: 35 },
  { name: "Washington State", conf: "Pac-12", totalRev: 78.6, donorPct: 14, instPct: 25, selfPct: 61, footballSharePct: 34 },
  { name: "Boise State", conf: "MWC", totalRev: 68.5, donorPct: 16, instPct: 24, selfPct: 60, footballSharePct: 38 },
  { name: "San Diego State", conf: "MWC", totalRev: 62.3, donorPct: 12, instPct: 28, selfPct: 60, footballSharePct: 35 },
  { name: "Memphis", conf: "AAC", totalRev: 66.8, donorPct: 14, instPct: 26, selfPct: 60, footballSharePct: 36 },
  { name: "Tulane", conf: "AAC", totalRev: 64.2, donorPct: 22, instPct: 18, selfPct: 60, footballSharePct: 38 },
  { name: "Appalachian State", conf: "Sun Belt", totalRev: 52.3, donorPct: 12, instPct: 32, selfPct: 56, footballSharePct: 37 },
  { name: "Coastal Carolina", conf: "Sun Belt", totalRev: 38.5, donorPct: 10, instPct: 40, selfPct: 50, footballSharePct: 35 },
  { name: "Rutgers", conf: "Big Ten", totalRev: 124.6, donorPct: 10, instPct: 25, selfPct: 65, footballSharePct: 30 },
  { name: "UConn", conf: "Big East", totalRev: 78.3, donorPct: 11, instPct: 35, selfPct: 54, footballSharePct: 30 },
  { name: "UMass", conf: "MAC", totalRev: 44.2, donorPct: 8, instPct: 48, selfPct: 44, footballSharePct: 32 },
  { name: "Kansas", conf: "Big 12", totalRev: 108.5, donorPct: 16, instPct: 15, selfPct: 69, footballSharePct: 33 },
  { name: "Cal", conf: "ACC", totalRev: 108.7, donorPct: 14, instPct: 18, selfPct: 68, footballSharePct: 30 },
  // Ivy League (FCS - private schools, endowment-funded model, no athletic scholarships)
  // Source: U.S. Dept of Education EADA filing, academic year 2023-24 (collection year 2024)
  // EADA does not separate "donor" vs "institutional" revenue. It reports:
  //   - Sport-allocated revenue (IL_TOTAL_REVENUE_ALL)
  //   - "Not allocated by gender/sport" revenue (TOT_REVENUE_ALL_NOTALLOC) = institutional subsidies + donor gifts pooled
  // For consistency, we map: donorPct+instPct = "not allocated" pool, selfPct = sport-allocated revenue
  // Since Ivy schools are private with no public MFRS data, we cannot split donors from institutional support.
  // donorPct here represents the combined donor+institutional subsidy pool.
  // footballSharePct = TOTAL_EXPENSE_ALL_Football / GRND_TOTAL_EXPENSE
  // GRND_TOTAL_REVENUE | TOT_REVENUE_ALL_NOTALLOC (subsidy pool) | IL_TOTAL_REVENUE_ALL (sport-allocated)
  // Harvard:    $43,636,552 | $10,945,643 (25%) not-alloc | $24,867,219 (57%) sport-alloc | remainder=$7,823,690 (18%)
  // Yale:       $84,593,440 | $41,348,858 (49%) not-alloc | $29,786,342 (35%) sport-alloc | remainder=$13,458,240 (16%)
  // Princeton:  $47,797,015 | $14,334,587 (30%) not-alloc | $24,377,864 (51%) sport-alloc | remainder=$9,084,564 (19%)
  // Penn:       $56,137,691 | $34,719,745 (62%) not-alloc | $14,658,033 (26%) sport-alloc | remainder=$6,759,913 (12%)
  // Cornell:    $40,833,886 | $12,471,270 (31%) not-alloc | $20,813,404 (51%) sport-alloc | remainder=$7,549,212 (18%)
  // Columbia:   $40,185,323 | $15,957,013 (40%) not-alloc | $14,579,278 (36%) sport-alloc | remainder=$9,649,032 (24%)
  // Dartmouth:  $40,640,949 | $16,141,134 (40%) not-alloc | $17,348,203 (43%) sport-alloc | remainder=$7,151,612 (17%)
  // Brown:      $42,236,049 | $12,657,399 (30%) not-alloc | $22,063,253 (52%) sport-alloc | remainder=$7,515,397 (18%)
  //
  // EADA lumps donors + institutional support into "not allocated by sport."
  // donorPct = 0 for Ivy (cannot be separated from instPct in EADA data)
  // instPct = "not allocated" pool % (donors + school subsidies combined)
  // selfPct = sport-allocated revenue + remainder as % of total
  { name: "Harvard", conf: "Ivy League", totalRev: 43.6, donorPct: 0, instPct: 25, selfPct: 75, footballSharePct: 10, division: "FCS" },
  { name: "Yale", conf: "Ivy League", totalRev: 84.6, donorPct: 0, instPct: 49, selfPct: 51, footballSharePct: 13, division: "FCS" },
  { name: "Princeton", conf: "Ivy League", totalRev: 47.8, donorPct: 0, instPct: 30, selfPct: 70, footballSharePct: 11, division: "FCS" },
  { name: "Penn", conf: "Ivy League", totalRev: 56.1, donorPct: 0, instPct: 62, selfPct: 38, footballSharePct: 6, division: "FCS" },
  { name: "Cornell", conf: "Ivy League", totalRev: 40.8, donorPct: 0, instPct: 31, selfPct: 69, footballSharePct: 12, division: "FCS" },
  { name: "Columbia", conf: "Ivy League", totalRev: 40.2, donorPct: 0, instPct: 40, selfPct: 60, footballSharePct: 14, division: "FCS" },
  { name: "Dartmouth", conf: "Ivy League", totalRev: 40.6, donorPct: 0, instPct: 40, selfPct: 60, footballSharePct: 11, division: "FCS" },
  { name: "Brown", conf: "Ivy League", totalRev: 42.2, donorPct: 0, instPct: 30, selfPct: 70, footballSharePct: 10, division: "FCS" },
];

const CONFERENCES = [...new Set(SCHOOLS.map(s => s.conf))].sort();
