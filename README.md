# MineWatch Ghana

MineWatch Ghana is a lightweight public-health awareness and mining-risk education website for Ghanaian mining workers, mining families, students, educators, NGOs, mining-safety groups, and community leaders.

The project turns personal loss into public protection by explaining mining-related health risks in simple language, supporting early awareness, and visualizing educational exposure-risk categories for selected mining areas in Ghana.

## Problem Statement

Many mining workers and families are exposed to dust, silica, mercury, processing chemicals, and respiratory infection risks without receiving early, understandable health information. Symptoms such as persistent cough, breathlessness, chest pain, fever, or coughing blood may be ignored until illness becomes severe.

MineWatch Ghana does not diagnose disease. It helps people recognize warning signs earlier and encourages safer work practices, prevention, screening, and timely medical attention.

## Why It Matters

Mining supports livelihoods across Ghana, but unsafe exposure can affect workers, children, families, and surrounding communities. Clear health education can help people take prevention seriously before symptoms become dangerous.

This project is designed as an early-stage civic technology and digital health portfolio project: serious, transparent, ethical, and simple enough to run as a static website.

## Features

- Public-health hero section with clear non-diagnostic safety messaging.
- Plain-language health education cards for dust, silica, mercury, chemicals, pneumonia, and emergency warning signs.
- Symptom awareness checker with low, moderate, and high awareness outputs.
- Severe-symptom warning for coughing blood, severe chest pain, severe shortness of breath, confusion or fainting, and very high fever.
- Exposure risk assessment using years near mining work, mining environment, dust frequency, PPE use, mercury or chemical handling, and screening access.
- Ghana Mining Health Risk Dashboard powered by `data/mining-risk-data.json`.
- Dashboard search by region or town.
- Dashboard filters for All, Dust, Mercury, Chemical, and Respiratory exposure categories.
- Summary cards, animated bar chart, risk badges, and methodology notes.
- Accessible labels, keyboard-friendly controls, visible focus states, and `aria-live` result areas.
- No login, backend, tracking, paid APIs, or personal medical record collection.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- JSON

No frameworks, build tools, npm packages, backend code, or databases are required.

## How To Run Locally

Open `index.html` with Live Server or any static local server.

If opening the file directly prevents the dashboard JSON from loading, run a simple local server from the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How To Deploy

This project can be deployed as a static website.

GitHub Pages:

1. Push the project to a GitHub repository.
2. Open repository settings.
3. Enable Pages from the main branch.
4. Keep `index.html`, `styles.css`, `script.js`, and the `data/` folder at the project root.

Vercel:

1. Import the repository into Vercel.
2. Use the default static-site settings.
3. Do not add a build command.

## Data Limitations

The dashboard uses educational sample data for:

- Ashanti Region / Obuasi
- Western Region / Tarkwa-Prestea
- Western North Region / Bibiani
- Central Region / Dunkwa-on-Offin
- Upper East Region / Bolgatanga-Kejetia
- Ahafo Region / Kenyasi
- Eastern Region / Atiwa

The dashboard is an educational risk index, not live disease data. It is based on occupational health literature, Ghana mining-location context, and known exposure categories such as dust, silica, mercury, chemicals, and respiratory warning signs.

This first version does not use live hospital data, official diagnosis records, or personal medical records. It does not estimate individual disease probability and should not be used for diagnosis, treatment decisions, emergency triage, legal decisions, or policy enforcement.

## Medical And Ethical Safety Note

MineWatch Ghana is an educational awareness tool. It does not diagnose, treat, cure, confirm disease, or replace medical care.

For symptoms such as coughing blood, severe chest pain, severe shortness of breath, confusion or fainting, very high fever, or rapidly worsening illness, users should seek medical attention as soon as possible.

Any future AI or data collection feature should use privacy protection, consent, data minimization, fairness review, transparent limitations, and health-worker oversight.

## Future AI Roadmap

Phase 1: Awareness website and educational risk visualization

Phase 2: Anonymous community survey and reporting

Phase 3: Health-worker reviewed symptom guidance

Phase 4: AI-assisted occupational disease risk prediction using work history, exposure history, symptoms, PPE use, and screening data

Phase 5: Partnerships with health workers, NGOs, mining communities, and public-health researchers

## Project Files

- `index.html` - Semantic one-page website structure.
- `styles.css` - Responsive visual design, dashboard styling, accessibility states, and animations.
- `script.js` - Navigation, reveal animations, counters, symptom checker, exposure assessment, dashboard search/filtering, and chart rendering.
- `data/mining-risk-data.json` - Educational sample exposure-risk data for selected Ghanaian mining areas.
- `README.md` - Project documentation, safety boundaries, deployment guidance, and roadmap.
