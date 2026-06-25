const dashboardState = {
  data: [],
  activeFilter: "All"
};

const fallbackMiningRiskData = [
  {
    region: "Ashanti Region",
    area: "Obuasi",
    riskLevel: "High educational risk",
    riskScore: 88,
    mainActivity: "Deep and surface gold mining, ore handling, and processing",
    keyExposureRisks: ["Silica dust", "Respiratory disease", "Chemical processing"],
    suggestedHealthFocus: "Dust reduction, respirator use, lung screening, and early care for chronic cough or breathlessness.",
    categories: ["Dust", "Chemical", "Respiratory"]
  },
  {
    region: "Western Region",
    area: "Tarkwa-Prestea area",
    riskLevel: "High educational risk",
    riskScore: 84,
    mainActivity: "Gold mining, haul roads, crushing, and mineral processing",
    keyExposureRisks: ["Mine dust", "Silica exposure", "Processing chemicals"],
    suggestedHealthFocus: "Control visible dust, protect processing workers, and encourage regular respiratory checks.",
    categories: ["Dust", "Chemical", "Respiratory"]
  },
  {
    region: "Western North",
    area: "Bibiani area",
    riskLevel: "Moderate to high educational risk",
    riskScore: 76,
    mainActivity: "Gold mining and community-level ore processing",
    keyExposureRisks: ["Dust", "Mercury handling", "Respiratory symptoms"],
    suggestedHealthFocus: "Safe processing practices, avoiding mercury vapor, and early screening for persistent cough.",
    categories: ["Dust", "Mercury", "Respiratory"]
  },
  {
    region: "Central Region",
    area: "Dunkwa-on-Offin area",
    riskLevel: "Moderate to high educational risk",
    riskScore: 73,
    mainActivity: "Alluvial and small-scale gold mining near river systems",
    keyExposureRisks: ["Mercury exposure", "Contaminated water", "Dust"],
    suggestedHealthFocus: "Mercury-safe education, protecting children from chemicals, and reducing dust around processing sites.",
    categories: ["Dust", "Mercury", "Chemical"]
  },
  {
    region: "Upper East",
    area: "Bolgatanga-Kejetia area",
    riskLevel: "Moderate educational risk",
    riskScore: 68,
    mainActivity: "Artisanal and small-scale gold mining",
    keyExposureRisks: ["Mercury burning", "Dust", "Chemical contact"],
    suggestedHealthFocus: "Avoid burning mercury in homes, improve ventilation, and seek care for breathing or nervous-system symptoms.",
    categories: ["Dust", "Mercury", "Chemical", "Respiratory"]
  },
  {
    region: "Ahafo Region",
    area: "Kenyasi area",
    riskLevel: "Moderate educational risk",
    riskScore: 64,
    mainActivity: "Large-scale gold mining and nearby community exposure",
    keyExposureRisks: ["Dust from roads", "Respiratory irritation", "Chemical handling"],
    suggestedHealthFocus: "Community dust control, protective equipment for workers, and routine checks for respiratory symptoms.",
    categories: ["Dust", "Chemical", "Respiratory"]
  },
  {
    region: "Eastern Region",
    area: "Atiwa area",
    riskLevel: "Moderate educational risk",
    riskScore: 59,
    mainActivity: "Bauxite exploration context, quarrying, and community dust concerns",
    keyExposureRisks: ["Dust", "Land disturbance", "Respiratory irritation"],
    suggestedHealthFocus: "Prevent dust exposure during excavation and transport, and monitor cough or breathing complaints early.",
    categories: ["Dust", "Respiratory"]
  }
];

const riskMessages = {
  low: {
    title: "Low awareness risk",
    body: "You selected few warning signs. Keep protecting yourself from dust and chemicals, and seek health advice if symptoms continue or worsen."
  },
  moderate: {
    title: "Moderate awareness risk",
    body: "Some symptoms or exposure factors may need attention. Consider speaking with a qualified health professional, especially if symptoms last more than a few days."
  },
  high: {
    title: "High awareness risk",
    body: "Please seek medical attention as soon as possible, especially if symptoms are persistent or worsening. This tool does not diagnose disease."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupRevealAnimation();
  setupCounters();
  setupSymptomChecker();
  setupRiskAssessment();
  setupDashboard();
});

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!("IntersectionObserver" in window)) {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.count;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 850;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setupSymptomChecker() {
  const form = document.querySelector("#symptom-form");
  const result = document.querySelector("#symptom-result");
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = Array.from(form.querySelectorAll("input[type='checkbox']:checked"));
    const score = selected.reduce((total, input) => total + Number(input.value), 0);
    const hasUrgent = selected.some((input) => input.dataset.urgent === "true");

    let level = "low";
    if (score >= 10 || hasUrgent) level = "high";
    else if (score >= 5) level = "moderate";

    showResult(result, level, riskMessages[level].title, riskMessages[level].body);
  });
}

function setupRiskAssessment() {
  const form = document.querySelector("#risk-form");
  const result = document.querySelector("#risk-result");
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const years = Math.max(0, Number(data.get("years") || 0));
    const yearsScore = years >= 10 ? 4 : years >= 5 ? 3 : years >= 1 ? 1 : 0;
    const score =
      yearsScore +
      Number(data.get("activity")) +
      Number(data.get("mask")) +
      Number(data.get("dust")) +
      Number(data.get("chemicals")) +
      Number(data.get("screening"));

    let level = "low";
    let title = "Lower exposure risk";
    let body = "Keep using protection, reducing dust exposure, and attending regular medical screening when available.";

    if (score >= 12) {
      level = "high";
      title = "High exposure risk";
      body = "Suggested next steps: reduce dusty or chemical tasks where possible, use proper respiratory protection, seek medical screening, and get urgent care for severe or worsening symptoms.";
    } else if (score >= 7) {
      level = "moderate";
      title = "Moderate exposure risk";
      body = "Suggested next steps: improve mask use, reduce visible dust exposure, avoid direct chemical contact, and arrange screening if coughing or breathing problems continue.";
    }

    showResult(result, level, title, body);
  });
}

function showResult(container, level, title, body) {
  container.classList.remove("low", "moderate", "high");
  container.classList.add(level);
  container.innerHTML = `
    <span class="result-label">${level} result</span>
    <h3>${title}</h3>
    <p>${body}</p>
    <p><strong>Important:</strong> MineWatch Ghana is for health education and early awareness only. It does not diagnose disease or replace qualified medical care.</p>
  `;
}

async function setupDashboard() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      dashboardState.activeFilter = button.dataset.filter;
      renderDashboard();
    });
  });

  try {
    const response = await fetch("data/mining-risk-data.json");
    if (!response.ok) throw new Error("Unable to load dashboard data");
    dashboardState.data = await response.json();
    renderDashboard();
  } catch (error) {
    dashboardState.data = fallbackMiningRiskData;
    renderDashboard();
  }
}

function renderDashboard() {
  const regions = getFilteredRegions();
  renderRegionCards(regions);
  renderChart(regions);
}

function getFilteredRegions() {
  if (dashboardState.activeFilter === "All") return dashboardState.data;
  return dashboardState.data.filter((region) =>
    region.categories.includes(dashboardState.activeFilter)
  );
}

function renderRegionCards(regions) {
  const grid = document.querySelector("#region-grid");
  if (!grid) return;

  if (!regions.length) {
    grid.innerHTML = `<p class="location">No regions match this filter.</p>`;
    return;
  }

  grid.innerHTML = regions
    .map(
      (region) => `
        <article class="region-card reveal visible">
          <span class="badge ${riskClass(region.riskLevel)}">${region.riskLevel}</span>
          <h3>${region.region}</h3>
          <p class="location">${region.area}</p>
          <p><strong>Main mining activity:</strong> ${region.mainActivity}</p>
          <div class="tag-list" aria-label="Key exposure risks">
            ${region.keyExposureRisks.map((risk) => `<span>${risk}</span>`).join("")}
          </div>
          <p><strong>Suggested health focus:</strong> ${region.suggestedHealthFocus}</p>
        </article>
      `
    )
    .join("");
}

function renderChart(regions) {
  const chart = document.querySelector("#risk-chart");
  const count = document.querySelector("#chart-count");
  if (!chart) return;

  if (count) count.textContent = `${regions.length} ${regions.length === 1 ? "area" : "areas"}`;

  chart.innerHTML = regions
    .map(
      (region) => `
        <div class="bar-item">
          <div class="bar-meta">
            <span>${region.area}</span>
            <strong>${region.riskScore}/100</strong>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="--bar-width: ${region.riskScore}%"></div>
          </div>
        </div>
      `
    )
    .join("");
}

function riskClass(level) {
  const normalized = level.toLowerCase();
  if (normalized.includes("high")) return "high-risk";
  if (normalized.includes("medium") || normalized.includes("moderate")) return "medium-risk";
  return "lower-risk";
}
