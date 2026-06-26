const dashboardState = {
  data: [],
  activeFilter: "All",
  searchTerm: ""
};

const fallbackMiningRiskData = [
  {
    id: "ashanti-obuasi",
    region: "Ashanti Region",
    keyTown: "Obuasi",
    miningType: "Deep and surface gold mining, ore handling, and processing",
    riskScore: 88,
    riskLevel: "High",
    exposureCategories: ["Dust", "Chemical", "Respiratory"],
    possibleHealthConcerns: ["Silica dust exposure", "Chronic cough", "Breathlessness", "Chest irritation"],
    preventionFocus: "Dust reduction, respirator use, wet methods, ventilation, and early lung screening.",
    sourceBasis: "Educational sample based on mining-location context and occupational exposure categories.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "western-tarkwa-prestea",
    region: "Western Region",
    keyTown: "Tarkwa-Prestea",
    miningType: "Gold mining, haul roads, crushing, and mineral processing",
    riskScore: 84,
    riskLevel: "High",
    exposureCategories: ["Dust", "Chemical", "Respiratory"],
    possibleHealthConcerns: ["Mine dust exposure", "Silica exposure", "Processing chemical contact"],
    preventionFocus: "Control visible dust, protect processing workers, and encourage regular respiratory checks.",
    sourceBasis: "Educational sample based on known mining activity and broad health-risk literature.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "western-north-bibiani",
    region: "Western North Region",
    keyTown: "Bibiani",
    miningType: "Gold mining and community-level ore processing",
    riskScore: 76,
    riskLevel: "Moderate to High",
    exposureCategories: ["Dust", "Mercury", "Respiratory"],
    possibleHealthConcerns: ["Dust irritation", "Mercury vapor exposure", "Persistent cough"],
    preventionFocus: "Safe processing practices, avoiding mercury vapor, and early screening for persistent cough.",
    sourceBasis: "Educational sample based on exposure categories common to gold mining communities.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "central-dunkwa",
    region: "Central Region",
    keyTown: "Dunkwa-on-Offin",
    miningType: "Alluvial and small-scale gold mining near river systems",
    riskScore: 73,
    riskLevel: "Moderate to High",
    exposureCategories: ["Dust", "Mercury", "Chemical"],
    possibleHealthConcerns: ["Mercury contact", "Contaminated water exposure", "Dust exposure"],
    preventionFocus: "Mercury-safe education, child protection, safer storage, and dust reduction around processing sites.",
    sourceBasis: "Educational sample based on mining-location context and known exposure categories.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "upper-east-bolgatanga-kejetia",
    region: "Upper East Region",
    keyTown: "Bolgatanga-Kejetia",
    miningType: "Artisanal and small-scale gold mining",
    riskScore: 68,
    riskLevel: "Moderate",
    exposureCategories: ["Dust", "Mercury", "Chemical", "Respiratory"],
    possibleHealthConcerns: ["Mercury burning exposure", "Dust inhalation", "Chemical contact"],
    preventionFocus: "Avoid burning mercury near homes, improve ventilation, and seek care for breathing or nervous-system symptoms.",
    sourceBasis: "Educational sample based on occupational health literature and artisanal mining exposure patterns.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "ahafo-kenyasi",
    region: "Ahafo Region",
    keyTown: "Kenyasi",
    miningType: "Large-scale gold mining and nearby community exposure",
    riskScore: 64,
    riskLevel: "Moderate",
    exposureCategories: ["Dust", "Chemical", "Respiratory"],
    possibleHealthConcerns: ["Road dust", "Respiratory irritation", "Chemical handling concerns"],
    preventionFocus: "Community dust control, protective equipment for workers, and routine checks for respiratory symptoms.",
    sourceBasis: "Educational sample based on mining-location context and public-health exposure categories.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  },
  {
    id: "eastern-atiwa",
    region: "Eastern Region",
    keyTown: "Atiwa",
    miningType: "Bauxite exploration context, quarrying, and community dust concerns",
    riskScore: 59,
    riskLevel: "Moderate",
    exposureCategories: ["Dust", "Respiratory"],
    possibleHealthConcerns: ["Dust exposure", "Land disturbance", "Cough or breathing irritation"],
    preventionFocus: "Prevent dust exposure during excavation and transport, and monitor cough or breathing complaints early.",
    sourceBasis: "Educational sample based on mining-location context and dust exposure categories.",
    methodologyNote: "Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates."
  }
];

const symptomAdvice = {
  low: {
    title: "Low awareness risk",
    nextStep: "Keep reducing dust and chemical exposure. Watch for symptoms that continue, return, or become worse."
  },
  moderate: {
    title: "Moderate awareness risk",
    nextStep: "Consider speaking with a qualified health worker, especially if symptoms last more than a few days or affect work, sleep, or daily activity."
  },
  high: {
    title: "High awareness risk",
    nextStep: "Seek medical attention as soon as possible. This website cannot diagnose disease, but these symptoms should not be ignored."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupRevealAnimation();
  setupCounters();
  setupSymptomChecker();
  setupRiskAssessment();
  setupDashboard();
  setupMineWatchAI();
});

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const toggleLabel = toggle?.querySelector(".sr-only");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (toggleLabel) toggleLabel.textContent = isOpen ? "Close navigation menu" : "Open navigation menu";
    document.body.classList.toggle("nav-open", isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu(menu, toggle, toggleLabel);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu(menu, toggle, toggleLabel);
      toggle.focus();
    }
  });
}

function closeMenu(menu, toggle, toggleLabel) {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  if (toggleLabel) toggleLabel.textContent = "Open navigation menu";
  document.body.classList.remove("nav-open");
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
    const urgentSelections = selected.filter((input) => input.dataset.urgent === "true");
    const selectedLabels = selected.map((input) => input.parentElement.textContent.trim());

    let level = "low";
    if (score >= 10 || urgentSelections.length) level = "high";
    else if (score >= 5) level = "moderate";

    const reasons = selectedLabels.length
      ? selectedLabels
      : ["No symptoms or exposure factors were selected."];
    const urgentMessage = urgentSelections.length
      ? "Seek medical attention as soon as possible. This website cannot diagnose disease, but these symptoms should not be ignored."
      : "";

    showDetailedResult(result, {
      level,
      label: `${level} awareness result`,
      title: symptomAdvice[level].title,
      score,
      reasons,
      explanation: buildSymptomExplanation(level, urgentSelections.length),
      nextStep: symptomAdvice[level].nextStep,
      urgentMessage
    });
  });
}

function buildSymptomExplanation(level, urgentCount) {
  if (urgentCount) {
    return "A severe warning sign was selected, so the awareness level is high regardless of the total score.";
  }

  if (level === "high") {
    return "Several symptoms or exposure factors were selected, creating a higher awareness score.";
  }

  if (level === "moderate") {
    return "Some symptoms or exposure factors were selected, so it is worth paying attention early.";
  }

  return "Few warning signs were selected, but ongoing dust, mercury, or chemical exposure should still be reduced.";
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
    const fields = [
      {
        name: "Years near mining work",
        value: yearsScore,
        answer: years ? `${years} year${years === 1 ? "" : "s"}` : "Less than 1 year"
      },
      getSelectRisk(form, "environment", "Mining environment"),
      getSelectRisk(form, "dust", "Dust exposure frequency"),
      getSelectRisk(form, "ppe", "Mask/PPE use"),
      getSelectRisk(form, "chemicals", "Mercury or chemical handling"),
      getSelectRisk(form, "screening", "Medical screening access")
    ];

    const score = fields.reduce((total, field) => total + field.value, 0);
    const increasedRisk = fields.filter((field) => field.value >= 2);
    const level = score >= 14 ? "high" : score >= 8 ? "moderate" : "low";
    const titles = {
      low: "Lower possible exposure risk",
      moderate: "Moderate possible exposure risk",
      high: "High possible exposure risk"
    };
    const preventionAdvice = {
      low: "Keep using protection, reducing dust, and attending screening when available.",
      moderate: "Improve mask use, reduce dusty tasks where possible, avoid direct chemical contact, and arrange screening if symptoms continue.",
      high: "Prioritize dust controls, proper respiratory protection, safer chemical handling, medical screening, and urgent care for severe or worsening symptoms."
    };
    const nextSteps = {
      low: "Continue prevention habits and review this assessment again if your work conditions change.",
      moderate: "Talk with a health worker or safety leader about reducing exposure and getting a respiratory check.",
      high: "Seek screening from a qualified health professional and reduce high-exposure work until you receive proper guidance."
    };

    showDetailedResult(result, {
      level,
      label: `${level} possible exposure result`,
      title: titles[level],
      score,
      reasons: increasedRisk.length
        ? increasedRisk.map((field) => `${field.name}: ${field.answer}`)
        : ["No major risk-increasing answers were selected."],
      explanation: "The score combines years near mining work, environment, dust frequency, PPE use, chemical exposure, and screening access.",
      nextStep: nextSteps[level],
      preventionAdvice: preventionAdvice[level]
    });
  });
}

function getSelectRisk(form, name, label) {
  const select = form.elements[name];
  const selectedOption = select.options[select.selectedIndex];

  return {
    name: label,
    value: Number(select.value),
    answer: selectedOption.textContent.trim()
  };
}

function showDetailedResult(container, details) {
  container.classList.remove("low", "moderate", "high");
  container.classList.add(details.level);

  const urgentBlock = details.urgentMessage
    ? `<div class="urgent-note" role="alert">${details.urgentMessage}</div>`
    : "";
  const preventionBlock = details.preventionAdvice
    ? `<p><strong>Practical prevention advice:</strong> ${details.preventionAdvice}</p>`
    : "";

  container.innerHTML = `
    <span class="result-label">${details.label}</span>
    <h3>${details.title}</h3>
    <p><strong>Score:</strong> ${details.score}</p>
    <p><strong>Why this result appeared:</strong> ${details.explanation}</p>
    <ul class="result-list">
      ${details.reasons.map((reason) => `<li>${reason}</li>`).join("")}
    </ul>
    ${preventionBlock}
    <p><strong>Recommended next step:</strong> ${details.nextStep}</p>
    ${urgentBlock}
    <p><strong>Important:</strong> MineWatch Ghana is an educational awareness tool. It does not diagnose, treat, cure, confirm disease, or replace qualified medical care.</p>
  `;
}

function setupMineWatchAI() {
  const toggle = document.querySelector("[data-ai-toggle]");
  const panel = document.querySelector("[data-ai-panel]");
  const closeButton = document.querySelector("[data-ai-close]");
  const form = document.querySelector("[data-ai-form]");
  const input = document.querySelector("[data-ai-input]");
  const sendButton = document.querySelector("[data-ai-send]");
  const messages = document.querySelector("[data-ai-messages]");
  const statusElement = document.querySelector("[data-ai-status]");
  const suggestionButtons = document.querySelectorAll("[data-ai-question]");

  if (!toggle || !panel || !form || !input || !sendButton || !messages) return;

  if (statusElement) {
    statusElement.textContent = "Offline guide active.";
  }

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("open");
    if (isOpen) {
      closeAIPanel(toggle, panel);
    } else {
      openAIPanel(toggle, panel, input);
    }
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeAIPanel(toggle, panel);
      toggle.focus();
    });
  }

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.aiQuestion || "";
      sendAIQuestion({ input, messages, sendButton, statusElement });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendAIQuestion({ input, messages, sendButton, statusElement });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("open")) {
      closeAIPanel(toggle, panel);
      toggle.focus();
    }
  });
}

function openAIPanel(toggle, panel, input) {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", "true");
  setTimeout(() => input.focus(), 50);
}

function closeAIPanel(toggle, panel) {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  toggle.setAttribute("aria-expanded", "false");
}

async function sendAIQuestion({ input, messages, sendButton, statusElement }) {
  if (sendButton.disabled) return;

  const question = input.value.trim();

  if (!question) {
    input.focus();
    return;
  }

  appendAIMessage(messages, "user", question);
  input.value = "";
  input.focus();
  sendButton.disabled = true;
  sendButton.textContent = "Thinking";

  const loadingMessage = appendAIMessage(messages, "assistant loading", "Thinking");

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal
    });

    window.clearTimeout(timeoutId);

    let payload = {};

    try {
      payload = await response.json();
    } catch (error) {
      payload = {};
    }

    const usedGroq = Boolean(payload.answer && typeof payload.answer === "string" && payload.answer.trim());
    const answer = usedGroq ? payload.answer.trim() : generateMineWatchResponse(question);

    if (statusElement) {
      statusElement.textContent = usedGroq ? "Groq AI active." : "Offline guide active.";
    }

    loadingMessage.remove();
    appendAIMessage(messages, "assistant", answer);
  } catch (error) {
    if (statusElement) {
      statusElement.textContent = "Offline guide active.";
    }

    loadingMessage.remove();
    appendAIMessage(messages, "assistant", generateMineWatchResponse(question));
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Send";
  }
}

function generateMineWatchResponse(question) {
  const text = question.toLowerCase();
  const disclaimer = "This is health education only, not a diagnosis. A qualified health professional should evaluate persistent, severe, or worsening symptoms.";
  const urgentWarning =
    "Seek medical attention as soon as possible. This assistant cannot diagnose disease, but this symptom should not be ignored.";

  if (
    hasAny(text, [
      "coughing blood",
      "cough blood",
      "blood in cough",
      "severe chest pain",
      "cannot breathe",
      "difficulty breathing",
      "severe shortness of breath",
      "fainting",
      "confusion",
      "very high fever",
      "worsening symptoms"
    ])
  ) {
    return `${urgentWarning} If you can, move away from dust, fumes, mercury, or chemicals while seeking help. ${disclaimer}`;
  }

  if (hasAny(text, ["dust", "dust exposure", "inhalation", "crushing", "drilling", "ore handling", "rock dust"])) {
    return `Dust from mining, crushing, drilling, blasting, roads, or ore handling can irritate the lungs and may contribute to long-term breathing problems. Practical steps include reducing dust at the source, using wet methods where possible, improving ventilation, avoiding dust clouds, and using appropriate respiratory protection. If cough, chest tightness, or breathlessness continues, seek medical screening. ${disclaimer}`;
  }

  if (hasAny(text, ["silica", "silicosis"])) {
    return `Silica is a harmful fine dust that can come from cutting, drilling, crushing, or handling certain rocks. Breathing silica repeatedly over time can damage the lungs. Use wet methods, ventilation, dust controls, and appropriate respirators, and seek screening for persistent cough or breathlessness. ${disclaimer}`;
  }

  if (hasAny(text, ["pneumoconiosis", "black lung", "lung disease from dust", "lung scarring"])) {
    return `Pneumoconiosis is a long-term lung disease caused by breathing harmful dust over time. In simple terms, dust can scar the lungs and make breathing harder. It needs medical evaluation and cannot be confirmed by this website or assistant. ${disclaimer}`;
  }

  if (hasAny(text, ["mercury", "amalgam", "burning mercury", "mercury vapor"])) {
    return `Mercury can harm health, especially when it is handled directly or burned. Mercury vapor can affect workers, families, children, and pregnant women. Avoid burning mercury near homes, avoid touching it with bare hands, wash hands after possible contact, keep children away from contaminated areas, and seek health advice if symptoms occur. ${disclaimer}`;
  }

  if (hasAny(text, ["chemical", "chemicals", "acid", "cyanide", "fuel", "solvent", "contaminated water"])) {
    return `Mining chemicals, fuels, acids, solvents, or contaminated water can irritate the skin, eyes, lungs, or stomach. Reduce direct contact, avoid fumes, wash exposed skin with clean water, store chemicals away from children and food, and seek medical advice if symptoms appear after exposure. ${disclaimer}`;
  }

  if (hasAny(text, ["persistent cough", "long cough", "cough", "coughing"])) {
    return `A persistent cough can come from many causes, including dust irritation, respiratory infection, smoke, or other health problems. In mining areas, a cough that continues should not be ignored, especially with chest pain, fever, weight loss, breathlessness, or blood. Seek screening from a qualified health worker if it continues. ${disclaimer}`;
  }

  if (hasAny(text, ["chest pain", "chest tightness", "pain in chest"])) {
    return `Chest pain or tightness can have many causes. In mining communities, dust, infection, heavy work, or other conditions may be involved. If chest pain is severe, worsening, or comes with breathlessness, fainting, sweating, or coughing blood, seek medical attention as soon as possible. ${disclaimer}`;
  }

  if (hasAny(text, ["shortness of breath", "breathless", "breathlessness", "hard to breathe", "breathing problem"])) {
    return `Shortness of breath can be a warning sign, especially after dust, chemical, or mercury exposure, or with fever or chest pain. Move away from dust or fumes, rest, and seek medical care if it is severe, worsening, new, or affecting daily activity. ${disclaimer}`;
  }

  if (hasAny(text, ["fever", "high temperature", "temperature", "pneumonia", "infection"])) {
    return `Fever with cough, chest pain, fast breathing, chills, weakness, or worsening breathlessness may suggest a respiratory infection such as pneumonia. This needs attention from a qualified health professional, especially if fever is high or symptoms are worsening. ${disclaimer}`;
  }

  if (hasAny(text, ["ppe", "mask", "masks", "respirator", "respirators", "protection"])) {
    return `Cloth alone may not protect well from fine mining dust. Appropriate respirators or masks, correct fit, replacement when dirty or damaged, and dust control at the source are all important. PPE works best with wet methods, ventilation, and keeping dusty work away from homes. ${disclaimer}`;
  }

  if (hasAny(text, ["prevention", "prevent", "reduce risk", "safe", "safety", "protect"])) {
    return `Practical prevention steps include reducing dust at the source, using wet methods where possible, improving ventilation, wearing appropriate masks or respirators, avoiding direct mercury or chemical contact, keeping children away from mining chemicals, and seeking screening for persistent cough or breathlessness. ${disclaimer}`;
  }

  if (hasAny(text, ["work history", "mining history", "years", "worked in mine", "worked near mining", "exposure history"])) {
    return `Mining work history matters because repeated exposure over months or years can increase concern for dust, silica, mercury, chemical, or respiratory problems. Keep track of years worked, tasks done, dust levels, PPE use, mercury or chemical contact, and symptoms. Share this history with a qualified health worker during screening. ${disclaimer}`;
  }

  if (hasAny(text, ["screening", "medical screening", "checkup", "health check", "doctor", "clinic", "hospital"])) {
    return `Medical screening can help a qualified health worker evaluate symptoms and exposure history. Screening may be especially important for persistent cough, breathlessness, chest pain, fever, weight loss, coughing blood, or many years of dusty work. This assistant cannot confirm disease. ${disclaimer}`;
  }

  if (hasAny(text, ["children", "child", "families", "family", "pregnant", "home", "school"])) {
    return `Children and families near mining areas should be protected from dust, mercury, chemicals, and contaminated soil or water. Keep mining chemicals away from homes, food, water, and schools. Avoid burning mercury near people, wash hands after possible exposure, and keep children away from processing areas. ${disclaimer}`;
  }

  if (hasAny(text, ["mining health", "health risk", "health risks", "mine risk", "mining risks", "general risk"])) {
    return `Common mining-related health concerns include dust inhalation, silica exposure, mercury exposure, chemical contact, respiratory infections, persistent cough, chest pain, and breathlessness. Prevention, PPE, safer handling, dust control, and early screening are important. ${disclaimer}`;
  }

  return "I may not have a specific answer for that yet, but MineWatch Ghana can help with dust exposure, mercury exposure, chemical exposure, cough, chest pain, breathlessness, PPE, prevention, and when to seek medical care. Please ask about one of those topics.";
}

function hasAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function appendAIMessage(messages, type, text) {
  const message = document.createElement("div");
  const paragraph = document.createElement("p");

  message.className = `ai-message ${type}`;
  paragraph.textContent = text;
  message.append(paragraph);
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;

  return message;
}

async function setupDashboard() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.querySelector("#dashboard-search");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      dashboardState.activeFilter = button.dataset.filter;
      renderDashboard();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      dashboardState.searchTerm = searchInput.value.trim().toLowerCase();
      renderDashboard();
    });
  }

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
  renderSummaryCards(regions);
  renderRegionCards(regions);
  renderChart(regions);
}

function getFilteredRegions() {
  return dashboardState.data.filter((region) => {
    const matchesFilter =
      dashboardState.activeFilter === "All" ||
      region.exposureCategories.includes(dashboardState.activeFilter);
    const searchable = `${region.region} ${region.keyTown} ${region.miningType}`.toLowerCase();
    const matchesSearch = !dashboardState.searchTerm || searchable.includes(dashboardState.searchTerm);

    return matchesFilter && matchesSearch;
  });
}

function renderSummaryCards(regions) {
  const summary = document.querySelector("#dashboard-summary");
  if (!summary) return;

  const average = regions.length
    ? Math.round(regions.reduce((total, region) => total + Number(region.riskScore), 0) / regions.length)
    : 0;
  const highCount = regions.filter((region) => region.riskLevel.toLowerCase().includes("high")).length;
  const categories = new Set(regions.flatMap((region) => region.exposureCategories));

  summary.innerHTML = `
    <article class="summary-card">
      <span>${regions.length}</span>
      <p>areas shown</p>
    </article>
    <article class="summary-card">
      <span>${average}/100</span>
      <p>average educational score</p>
    </article>
    <article class="summary-card">
      <span>${highCount}</span>
      <p>higher-risk areas</p>
    </article>
    <article class="summary-card">
      <span>${categories.size}</span>
      <p>exposure categories</p>
    </article>
  `;
}

function renderRegionCards(regions) {
  const grid = document.querySelector("#region-grid");
  if (!grid) return;

  if (!regions.length) {
    grid.innerHTML = `<p class="empty-state">No areas match this search or filter. Educational risk index - not live disease data, official medical surveillance, or confirmed disease rates.</p>`;
    return;
  }

  grid.innerHTML = regions
    .map(
      (region) => `
        <article class="region-card reveal visible">
          <span class="badge ${riskClass(region.riskLevel)}">${escapeHTML(region.riskLevel)} risk</span>
          <h3>${escapeHTML(region.region)}</h3>
          <p class="location">${escapeHTML(region.keyTown)}</p>
          <p><strong>Mining context:</strong> ${escapeHTML(region.miningType)}</p>
          <p><strong>Educational score:</strong> ${Number(region.riskScore)}/100</p>
          <div class="tag-list" aria-label="Exposure categories">
            ${region.exposureCategories.map((risk) => `<span>${escapeHTML(risk)}</span>`).join("")}
          </div>
          <p><strong>Possible health concerns:</strong> ${region.possibleHealthConcerns.map(escapeHTML).join(", ")}</p>
          <p><strong>Prevention focus:</strong> ${escapeHTML(region.preventionFocus)}</p>
          <p><strong>Source basis:</strong> ${escapeHTML(region.sourceBasis)}</p>
          <p class="method-note">${escapeHTML(region.methodologyNote)}</p>
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
            <span>${escapeHTML(region.keyTown)}</span>
            <strong>${region.riskScore}/100</strong>
          </div>
          <div class="bar-track">
            <div class="bar-fill ${riskClass(region.riskLevel)}" style="--bar-width: ${region.riskScore}%"></div>
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

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
