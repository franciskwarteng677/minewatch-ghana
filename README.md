# MineWatch Ghana
Live Demo: https://minewatch-ghana.vercel.app
MineWatch Ghana is a static educational MVP for public-health awareness and mining-risk visualization in Ghana. It is built for mining workers, mining families, students, health educators, NGOs, mining-safety organizations, and community leaders.


## Short Description

MineWatch Ghana explains occupational health risks in simple language and visualizes educational exposure-risk categories for selected mining areas. It focuses on dust inhalation, silica exposure, mercury exposure, chemical exposure, respiratory warning signs, pneumonia risk, pneumoconiosis risk, chronic cough, breathlessness, chest pain, and delayed symptoms.

This project is for health education and early awareness. It does not diagnose disease, treat illness, cure illness, confirm disease, predict confirmed disease, replace medical care, or provide official medical surveillance.

## Ask MineWatch AI

Ask MineWatch AI is an educational chat assistant for mining-health questions. It works offline by default using a rule-based response engine in `script.js`, so it still works with Live Server and static deployment without any API key or backend.

For deployments on Vercel, the assistant can optionally use GroqCloud when `GROQ_API_KEY` is configured. If the API key is missing, the request fails, or the Groq request is unavailable, the assistant automatically falls back to the existing offline rule-based response.

The assistant is not a doctor. It does not diagnose, treat, cure, confirm disease, predict confirmed disease, or replace care from qualified medical professionals. For severe or worsening symptoms, it should advise users to seek medical attention as soon as possible.

Current design:

- Responses are generated locally in `script.js` when offline mode is used.
- Optional Groq-backed responses are served through the Vercel serverless route in `api/ask.js`.
- The assistant uses keyword and phrase matching for topics such as dust, silica, pneumoconiosis, mercury, chemicals, cough, chest pain, breathlessness, PPE, prevention, mining work history, screening, and family protection.
- The assistant is educational and not a diagnosis system.

## Problem Statement

Mining can expose workers and nearby families to dust, silica, mercury, processing chemicals, and respiratory infection risks. Many people do not receive early, practical, understandable information about symptoms and exposure before problems become severe.

MineWatch Ghana helps users understand possible warning signs, reflect on exposure history, and seek care from qualified health professionals when symptoms are severe, worsening, or persistent.

## Personal Motivation

This project is rooted in the idea that personal loss can become public protection. The goal is to turn painful experience into a practical civic-health tool that supports awareness, prevention, safer mining practices, and earlier conversations with health workers.

The tone is intentionally serious, respectful, and humanitarian. It avoids fear-based claims and does not pretend to replace clinical care.

## Features

- Professional one-page public-health website.
- Plain-language education cards for dust, silica, mercury, chemical exposure, pneumonia and respiratory infections, and severe warning signs.
- Symptom awareness checker with low, moderate, and high awareness outputs.
- Severe-symptom warning for coughing blood, severe chest pain, severe shortness of breath, confusion or fainting, and very high fever.
- Exposure risk assessment using years near mining work, mining environment, dust frequency, PPE use, mercury or chemical handling, and screening access.
- Ghana Mining Health Risk Dashboard powered by `data/mining-risk-data.json`.
- Search by region or town.
- Filter buttons for All, Dust, Mercury, Chemical, and Respiratory.
- Summary cards, animated bar chart, risk badges, and source-basis notes.
- Clear dashboard limitation text: educational risk index, not live disease data.
- Floating Ask MineWatch AI chat panel with suggested questions and safe medical guardrails.
- Accessible form labels, keyboard-friendly controls, visible focus states, and `aria-live` result areas.
- No login, database, authentication, tracking, or personal medical record collection.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- JSON
- Vercel serverless functions

No frontend frameworks, React, Next.js, Vite, Tailwind, or client-side API keys are used. Optional AI responses are handled server-side through `api/ask.js`.

## How To Run Locally

Open the project with Live Server from the project root.

You can also use any simple static server. If your local browser blocks JSON loading from `file://`, use Live Server so `data/mining-risk-data.json` can be loaded normally.

Important local testing note:

- Live Server can preview the static website, dashboard, symptom checker, risk assessment, and Ask MineWatch AI.
- Ask MineWatch AI works locally because it uses the built-in offline rule-based response engine in `script.js`.
- No `GROQ_API_KEY`, Vercel local function runtime, or backend setup is required for local use.

## How To Deploy

GitHub Pages:

1. Push the repository to GitHub.
2. Open repository settings.
3. Enable GitHub Pages from the main branch.
4. Keep `index.html`, `styles.css`, `script.js`, and the `data/` folder at the project root.

Vercel:

1. Import the repository into Vercel.
2. Use the default setup for a static site with serverless functions.
3. Leave the build command empty.
4. Add the environment variable `GROQ_API_KEY` in Vercel if you want optional Groq-backed answers.
5. Deploy the project.
6. Test the Ask MineWatch AI panel after deployment.

If `GROQ_API_KEY` is not set, the assistant still works using the offline fallback. Do not place API keys in frontend files.

## Data Limitations

The dashboard uses educational sample data for:

- Ashanti Region / Obuasi
- Western Region / Tarkwa-Prestea
- Western North Region / Bibiani
- Central Region / Dunkwa-on-Offin
- Upper East Region / Bolgatanga-Kejetia
- Ahafo Region / Kenyasi
- Eastern Region / Atiwa

The dashboard is an educational risk index, not live disease data, not official medical surveillance, and not confirmed disease rates. It uses mining-location context and occupational exposure categories such as dust, silica, mercury, chemicals, and respiratory warning signs.

This first version does not use live hospital data, official diagnosis records, government disease surveillance data, or personal medical records. It should not be used for diagnosis, clinical decisions, emergency triage, legal decisions, policy enforcement, or claims about confirmed disease burden.

## Evidence Base And Source Direction

The current MVP is guided by broad public-health and occupational-risk categories. It does not claim to have imported official datasets.

Future source directions include:

- NIOSH mining health and silicosis resources.
- WHO mercury exposure and artisanal gold mining resources.
- Ghana mining and occupational-health research.
- Ghana mining-location context.
- Future Ghana Minerals Commission and public-health datasets.
- Future anonymous community survey data, only with consent, privacy protection, and ethical safeguards.

## Medical And Ethical Safety Note

MineWatch Ghana is an educational awareness tool. It does not diagnose, treat, cure, confirm disease, predict confirmed disease, or replace care from a qualified health professional.

For severe or worsening symptoms such as coughing blood, severe chest pain, severe shortness of breath, confusion or fainting, very high fever, or rapidly worsening illness, users should seek medical attention as soon as possible.

Any future AI API or data collection feature should use privacy protection, consent, data minimization, fairness review, transparent limitations, and health-worker oversight.

## Future AI Roadmap

Phase 1: Awareness website and educational risk visualization

Phase 2: Anonymous community survey and reporting

Phase 3: Health-worker reviewed symptom guidance

Phase 4: AI-assisted occupational disease risk prediction using work history, exposure history, symptoms, PPE use, and screening data

Phase 5: Partnerships with health workers, NGOs, mining communities, public-health researchers, and responsible institutions

The current assistant is rule-based and free. Future AI-model features would require ethical review, privacy safeguards, clinical oversight, sustainable funding or API access, and clear language that results are decision-support outputs rather than diagnoses.

## Future Partnership Roadmap

- Health workers and occupational-health educators for reviewed guidance.
- Mining communities for local context and safer reporting workflows.
- NGOs and civic-health organizations for outreach.
- Public-health researchers for study design and evaluation.
- Responsible institutions for validated datasets and ethical deployment pathways.

## Suggested Screenshots

Add screenshots before publishing the repository profile:

- Hero section with safety notice.
- Health Risks education cards.
- Symptom awareness result.
- Exposure risk assessment result.
- Ghana Mining Health Risk Dashboard.
- Methodology and source-direction section.

## Project Files

- `index.html` - Semantic one-page website structure.
- `styles.css` - Responsive visual design, dashboard styling, accessibility states, and animations.
- `script.js` - Navigation, reveal animations, counters, symptom checker, exposure assessment, dashboard search/filtering, chart rendering, and the local rule-based Ask MineWatch AI assistant.
- `data/mining-risk-data.json` - Educational sample exposure-risk data for selected Ghanaian mining areas.
- `.gitignore` - Ignores local secrets, Vercel files, and dependencies if future tooling is added.
- `README.md` - GitHub-ready project documentation, safety boundaries, deployment guidance, and roadmap.
