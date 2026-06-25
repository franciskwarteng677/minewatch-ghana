# MineWatch Ghana

MineWatch Ghana is a static public-health awareness website for mining workers, mining families, students, local communities, NGOs, health educators, and policymakers in Ghana.

The project explains mining-related health risks in simple English, supports early awareness through interactive tools, and visualizes educational risk categories for selected Ghanaian mining areas.

## Important Safety Notice

MineWatch Ghana is an educational awareness tool. It is not a medical diagnosis system and does not replace a qualified health professional.

For symptoms such as coughing blood, severe chest pain, severe breathlessness, high fever, or rapidly worsening illness, users should seek urgent medical care.

## Files

- `index.html` - One-page semantic website structure.
- `styles.css` - Responsive visual design, layout, accessibility states, and animations.
- `script.js` - Navigation, reveal animations, animated counters, interactive forms, dashboard loading, filtering, and chart rendering.
- `data/mining-risk-data.json` - Sample educational mining-risk data used by the dashboard.
- `README.md` - Project explanation and roadmap.

## Features

- Premium dark public-health interface with gold mining accents and green protection accents.
- Mobile-first responsive layout.
- Hero, mission, problem, health risks, symptom checker, risk assessment, dashboard, prevention guide, methodology, and call-to-action sections.
- Symptom awareness checker with low, moderate, and high awareness outputs.
- Exposure risk assessment based on years near mining, activity type, mask use, dust exposure, chemical exposure, and medical screening.
- Ghana mining health risk dashboard with filter buttons for:
  - All
  - Dust
  - Mercury
  - Chemical
  - Respiratory
- Vanilla JavaScript bar chart rendered from JSON data.
- Clear disclaimer that the website does not diagnose disease.
- No login, backend, tracking, paid APIs, or personal medical data collection.

## Data Limitations

The dashboard uses sample educational data for selected mining areas:

- Ashanti Region / Obuasi
- Western Region / Tarkwa-Prestea area
- Western North / Bibiani area
- Central Region / Dunkwa-on-Offin area
- Upper East / Bolgatanga-Kejetia area
- Ahafo Region / Kenyasi area
- Eastern Region / Atiwa area

The data is intended for awareness and education only. It is based on known mining activity and broad published health-risk categories such as dust exposure, silica exposure, mercury exposure, chemical exposure, and respiratory warning signs.

It is not a live medical surveillance database, does not estimate individual disease probability, and should not be used for diagnosis, treatment decisions, emergency triage, or policy enforcement without expert review.

## Running the Site

Open `index.html` directly in a browser.

Some browsers restrict local JSON loading when a page is opened directly from the file system. If the dashboard data does not load, run a small local static server from the project folder, for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Future AI Roadmap

Future versions of MineWatch Ghana could include AI-assisted risk education after ethical and technical review. Possible additions include:

- Verified public datasets from health, mining, environmental, and occupational safety sources.
- Community reporting workflows with privacy protection and moderation.
- Health-worker partnerships for clinically reviewed guidance.
- Multilingual support for local Ghanaian languages.
- Offline-first mobile access for low-connectivity communities.
- AI-assisted early risk prediction using transparent models, consent, strong privacy safeguards, and clinical oversight.
- Referral guidance that points users to appropriate qualified care without claiming to diagnose illness.

Any AI feature should be designed with public-health ethics, data minimization, fairness, explainability, and human clinical review.

## Content Principle

MineWatch Ghana uses clear language for ordinary workers and families. Medical terms are avoided where possible or explained in plain English.
