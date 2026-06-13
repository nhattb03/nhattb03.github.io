# PRD — Nha Tran Personal Portfolio Website

> **Document type:** Product Requirements Document (Agent-Executable)
> **Executor:** Antigravity IDE (agent) — Claude as reasoning layer
> **Methodology:** AI proposes, human decides. Each phase = one Definition-of-Done gate.
> **Owner:** Tran Thi Bich Nha (FinOps job seeker)
> **Reference architecture:** `trinpb04/personal-portfolio` (React+Vite+Tailwind+Framer Motion), with GitHub auto-fetch REMOVED.

---

## 0. Context & Intent

### 0.1 Who this is for
Nha Tran — Banking & Finance graduate transitioning into **Financial Operations**. This is a job-seeking portfolio, NOT a developer showcase. The audience is **recruiters and hiring managers** at fintech, securities firms, FDI finance teams, and banking ops divisions in Ho Chi Minh City.

### 0.2 Single job of this site
Convince a recruiter — within 30 seconds of scrolling — that Nha is a **detail-oriented, process-driven operations professional** with real banking experience AND quantitative/modeling capability that exceeds a typical admin candidate.

### 0.3 Key differences from the reference repo
| Reference (`trinpb04`) | This build (Nha) |
|---|---|
| Hacker/dark terminal aesthetic | **Clean, professional, trustworthy** (finance industry register) |
| GitHub API auto-fetch of repos (`update_repos.py`) | **REMOVED entirely** — all content is static JSON |
| Projects = code repos | Projects = **financial models, research, ops achievements** |
| Identity: Data Analyst | Identity: **Financial Operations** |
| Dark/light toggle | Light-first, optional dark toggle (light is default) |

> **CRITICAL:** Do NOT implement any GitHub integration, repo fetching, `update_repos.py`, or GitHub-style contribution grids. The reference's "dynamic projects slicer" can stay as a UI pattern (category filter), but it must read from a static local JSON, never from an API.

---

## 1. Tech Stack (mandatory)

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (utility-first) + minimal vanilla CSS for custom tokens
- **Animation:** Framer Motion (used with restraint — see §4)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (self-imported via `index.html` or CSS `@import`)
- **Deployment target:** Vercel (static build)
- **Data layer:** Local JSON files in `src/data/` — NO external API calls
- **Node:** v18+

Do not add: state management libraries (Redux/Zustand), backend, database, auth, analytics SDKs, or any network-dependent feature. This is a fully static site.

---

## 2. Design System (clean professional — FinOps)

> Agent: derive every color and font decision from this token system. Do not substitute defaults.

### 2.1 Color palette
A restrained, trustworthy finance palette. Light-first.

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FBFBFD` | Page background (near-white, soft) |
| `--surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--ink` | `#1A1F2E` | Primary text (deep navy-black) |
| `--muted` | `#5B6472` | Secondary text, captions |
| `--accent` | `#1E5EFF` | Primary accent (confident blue — links, key CTA, active states) |
| `--accent-deep` | `#0B3B8C` | Hover/pressed accent |
| `--line` | `#E6E9EF` | Hairline borders, dividers |
| `--success` | `#127C5A` | Subtle positive highlights (metrics like "-25%") |

**Dark mode tokens (optional, if toggle implemented):**
| Token | Hex |
|---|---|
| `--bg` | `#0E1117` |
| `--surface` | `#161B22` |
| `--ink` | `#E8EBF0` |
| `--muted` | `#8B95A5` |
| `--line` | `#232A35` |
(accent stays `#1E5EFF`, brightened to `#4D82FF` on dark)

### 2.2 Typography
Deliberate pairing — NOT the same generic Inter-everywhere default.

- **Display / headings:** `"Fraunces"` (serif, optical, carries finance gravitas) OR `"Spectral"` if Fraunces feels too editorial. Use with restraint — headings only.
- **Body / UI:** `"Inter"` (clean, neutral, highly legible at small sizes)
- **Data / mono accent:** `"JetBrains Mono"` — used ONLY for numbers, metrics, dates, and skill tags (ties subtly back to the "quantitative" identity)

Type scale (rem): `0.75 / 0.875 / 1 / 1.25 / 1.5 / 2 / 2.75 / 3.5`. Headings use tighter line-height (1.1–1.2); body 1.6.

### 2.3 Layout principles
- Max content width: `1080px`, centered, generous side padding (≥24px mobile, ≥48px desktop)
- Section vertical rhythm: large, consistent spacing (`py-20` desktop / `py-12` mobile)
- Border-radius: subtle (`8px` cards, `6px` buttons) — professional, not playful
- Hairline dividers (`--line`) between sections, NOT heavy borders
- Generous whitespace — let content breathe (this signals "organized/precise")

### 2.4 Signature element
**The one memorable thing:** a subtle **"ledger line" motif** — thin horizontal hairlines with a single accent tick mark that animates in on scroll, echoing an accounting ledger / financial statement. Used as section dividers and under the hero name. This encodes Nha's domain (finance/operations) without being literal or cheesy. Spend boldness here; keep everything else quiet.

### 2.5 Quality floor (non-negotiable)
- Fully responsive: mobile (375px) → tablet → desktop
- Visible keyboard focus states (accent ring)
- `prefers-reduced-motion` respected (disable Framer Motion transitions)
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, proper heading hierarchy)
- Lighthouse: aim ≥95 performance, 100 accessibility

---

## 3. Site Structure & Sections

Single-page application with smooth-scroll nav. Sections in order:

### 3.1 Navbar (sticky, minimal)
- Left: "Nha Tran" wordmark (Fraunces)
- Right: anchor links — About · Experience · Projects · Skills · Contact
- Optional: dark/light toggle (far right)
- On scroll: subtle background blur + hairline bottom border appears

### 3.2 Hero
- **Headline:** Name "Tran Thi Bich Nha" (large Fraunces)
- **Sub:** "Financial Operations · Banking & Finance Graduate"
- **One-line thesis:** "I turn financial detail into reliable operations — accurate transactions, clean records, sound decisions."
- Below: the **ledger-line signature** animates in
- Two CTAs: `[ Get in touch ]` (filled accent) · `[ Download CV ]` (outline) — CV links to a PDF in `/public`
- Location chip: "Ho Chi Minh City, Vietnam" with Lucide `MapPin`
- NO stock photo. NO big-number-with-gradient template hero.

### 3.3 About
2–3 short paragraphs (copy provided in §5.1). Beside it: a compact "At a glance" card with mono-styled quick facts (education, focus area, languages).

### 3.4 Experience (timeline)
Vertical timeline, 2 entries (MB Bank, Toan Cau IT). Each: role, company, dates (mono), 3 bullet achievements. Content in §5.2. The ledger-line motif runs down the timeline spine.

### 3.5 Projects (filterable grid — static JSON)
- Category filter chips (slicer pattern from reference, but static): `All · Financial Modeling · Research · Operations`
- Cards read from `src/data/projects.json`
- Each card: title, category tag (mono), tools used, 1-line description, key result
- Content in §5.3
- Framer Motion: cards fade/slide in on filter change (respect reduced-motion)

### 3.6 Skills
Grouped by category (Operations / Analytical / Tools). Skill tags styled in JetBrains Mono with subtle accent border. NO arbitrary "proficiency %" bars (they read as fake). Content in §5.4.

### 3.7 Contact
- Simple: email (mailto), LinkedIn link, location
- Small ledger-line footer
- NO contact form (static site, no backend) — direct mailto + LinkedIn only

### 3.8 Footer
Minimal: "© 2026 Nha Tran" + LinkedIn icon. Hairline top border.

---

## 4. Animation Guidance (restraint)

Framer Motion, used deliberately:
- Hero: ledger-line draws in once on load (SVG path animation)
- Sections: subtle fade-up on scroll-into-view (stagger children, ~0.4s)
- Project cards: layout animation on filter
- Hover: cards lift 2px + accent border; buttons darken accent
- **NOT:** parallax, particle effects, typewriter text, infinite loops, scroll-jacking

All motion wrapped to respect `prefers-reduced-motion: reduce`.

---

## 5. Content (use verbatim — this is real, verified content)

### 5.1 About copy
> Paragraph 1: I'm a Banking & Finance graduate from Ho Chi Minh City Open University, drawn to the operational side of finance — where accuracy, structured processes, and clean data keep a business running.
>
> Paragraph 2: My experience spans SME banking operations at MB Bank — handling transactions, credit documentation, and account servicing — and end-to-end sales administration on CRM systems at Toan Cau IT. Alongside, I've built financial models and conducted quantitative research, including DCF equity valuation and panel-data analysis of 141 listed firms.
>
> Paragraph 3: I'm now focused on Financial Operations roles where reliable execution and attention to detail create real business value.

**At-a-glance card:**
- Education: B.A. Banking & Finance (2021–2025)
- Focus: Financial Operations
- Strengths: Transaction Processing · Financial Modeling
- Languages: Vietnamese (native), English (working)
- Location: Ho Chi Minh City

### 5.2 Experience entries

**Entry 1 — Toan Cau Information Technology Co., Ltd.**
- Role: Sales Administrator
- Dates: Apr 2025 – May 2026
- Location: Ho Chi Minh City
- Bullets:
  1. Managed the end-to-end sales cycle on the internal CRM system, from inquiry intake to deal closing, ensuring smooth cross-departmental coordination.
  2. Maintained the quotations and contracts database, ensuring consistency and accuracy across departments for invoicing and sales planning.
  3. Processed transaction and customer data to improve operational efficiency and tracked contract execution progress.

**Entry 2 — Military Commercial Joint Stock Bank (MB Bank)**
- Role: Relationship Management Associate (Trainee) — SME Banking
- Dates: Aug 2024 – Feb 2025
- Location: Ho Chi Minh City
- Bullets:
  1. Handled account opening, maintenance, and daily transaction processing for SME clients, ensuring accurate and professional servicing.
  2. Prepared credit proposals, loan applications, and collateral documentation, supporting the end-to-end credit approval workflow.
  3. Coordinated with Relationship Managers on portfolio management and proactive client follow-ups.

### 5.3 Projects (projects.json structure)

```json
[
  {
    "id": "dcf-hsg",
    "title": "DCF Equity Valuation — Steel & Construction Materials (HOSE)",
    "category": "Financial Modeling",
    "tools": ["DCF/FCFF", "CAPM", "Advanced Excel"],
    "description": "Built a full discounted cash flow model for HSG (Hoa Sen Group) as part of an Investment Banking Analysis course.",
    "result": "Derived implied share price with sensitivity analysis across WACC and growth scenarios; Beta estimated from weekly returns vs VN-Index."
  },
  {
    "id": "ceo-roa",
    "title": "CEO Characteristics & Firm Performance on HOSE",
    "category": "Research",
    "tools": ["Panel Data Regression", "Stata", "OLS/FEM/REM/GLS"],
    "description": "Co-authored university research on how six CEO attributes affect firm ROA across 141 non-financial HOSE-listed firms (2015–2023, 1,269 observations).",
    "result": "Led data collection from financial & annual reports and statistical processing; found CEO ownership and gender positively associated with ROA."
  },
  {
    "id": "crm-ops",
    "title": "CRM Sales Operations & Contract Database",
    "category": "Operations",
    "tools": ["CRM Systems", "Excel", "Process Coordination"],
    "description": "Owned the end-to-end sales administration workflow at Toan Cau IT — CRM data, quotations, and contract tracking.",
    "result": "Maintained data consistency across departments and improved operational efficiency in invoicing and sales planning."
  },
  {
    "id": "credit-ops",
    "title": "SME Credit Documentation & Transaction Processing",
    "category": "Operations",
    "tools": ["Banking Ops", "Credit Documentation", "Account Servicing"],
    "description": "Supported the SME credit approval workflow at MB Bank — proposals, loan applications, collateral docs, and daily transactions.",
    "result": "Delivered accurate, audit-ready documentation supporting end-to-end credit decisions."
  }
]
```

### 5.4 Skills (grouped)
- **Operations:** Transaction Processing · Credit Documentation · Account Reconciliation · Contract & Quotation Management · CRM Systems
- **Analytical:** Financial Modeling (DCF/FCFF) · Financial Statement Analysis · Panel Data Regression · KPI Tracking
- **Tools:** Microsoft Excel · CRM Platforms · Stata

### 5.5 Contact
- Email: bichnha07122003@gmail.com
- LinkedIn: linkedin.com/in/nhattb03
- Location: Ho Chi Minh City, Vietnam
- CV: link to `/public/CV_NhaTran_EN.pdf` (Nha uploads her PDF here)

> Agent note: All placeholder content above is REAL and verified. Do not invent additional projects, metrics, certifications, or experience. If a field is missing, leave it out rather than fabricating.

---

## 6. File Structure (target)

```
nha-portfolio/
├── public/
│   ├── favicon.svg            # simple monogram "NT" — generate clean
│   └── CV_NhaTran_EN.pdf      # Nha adds her CV here
├── src/
│   ├── data/
│   │   ├── projects.json      # §5.3
│   │   └── skills.json        # §5.4
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── LedgerLine.jsx     # signature SVG component
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useReducedMotion.js
│   ├── styles/
│   │   └── tokens.css         # CSS custom properties from §2.1
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Tailwind directives + base
├── index.html
├── tailwind.config.js         # extend with token colors + font families
├── vite.config.js
├── package.json
└── README.md
```

NO `update_repos.py`. NO `.github/workflows` for repo fetching.

---

## 7. Execution Phases & Definition of Done

> Four-gate DoD. Agent completes a phase, presents result, waits for human approval before next phase. AI proposes, human decides.

### Phase 1 — Scaffold & Design System
**Build:** Vite+React project, Tailwind configured with token colors + 3 font families, `tokens.css`, base layout shell, Navbar + Footer, smooth-scroll routing.
**DoD Gate 1:**
- [ ] `npm run dev` runs clean, no console errors
- [ ] Fonts (Fraunces, Inter, JetBrains Mono) load correctly
- [ ] Token colors applied via CSS variables, switchable for dark mode
- [ ] Navbar sticky + responsive; Footer renders
- [ ] No GitHub/API code anywhere

### Phase 2 — Hero & Signature
**Build:** Hero section with name, thesis, CTAs, location chip. The `LedgerLine` SVG signature component with Framer Motion draw-in animation.
**DoD Gate 2:**
- [ ] Hero responsive 375px → desktop
- [ ] Ledger-line animates once on load; respects reduced-motion
- [ ] CV download button links to `/public` PDF (placeholder OK)
- [ ] Type hierarchy matches §2.2 scale

### Phase 3 — Content Sections
**Build:** About, Experience (timeline), Projects (filterable from JSON), Skills, Contact. All content from §5 verbatim.
**DoD Gate 3:**
- [ ] All copy matches §5 exactly — no invented content
- [ ] Projects filter chips work, read from `projects.json`
- [ ] Experience timeline renders both entries with ledger spine
- [ ] Skills grouped correctly, mono tags
- [ ] Contact: working mailto + LinkedIn link (no form)
- [ ] Scroll-into-view animations subtle + reduced-motion safe

### Phase 4 — Polish, A11y & Deploy
**Build:** Responsive QA, accessibility pass, performance, Vercel config.
**DoD Gate 4:**
- [ ] Lighthouse: Performance ≥95, Accessibility 100
- [ ] Keyboard nav works; visible focus rings
- [ ] `prefers-reduced-motion` fully respected
- [ ] Dark mode toggle works (if implemented) with no contrast failures
- [ ] Builds clean (`npm run build`); deploys to Vercel
- [ ] README documents how Nha edits `projects.json` / swaps CV PDF

---

## 8. Guardrails for the Agent

1. **No fabrication.** Every project, metric, date, and skill must come from §5. Do not add fake certifications, GitHub stats, or inflated numbers.
2. **No GitHub integration.** This is the explicit removal from the reference. Static JSON only.
3. **Professional register.** This is a finance candidate. No hacker/terminal/neon aesthetics. Clean, precise, trustworthy.
4. **Restraint on motion.** If in doubt, less animation. Over-animation reads as AI-generated and undermines the "precise/organized" message.
5. **Content integrity gate.** Before Phase 3 sign-off, diff rendered text against §5. Any drift = fail the gate.
6. **Ask, don't assume.** If a design or content decision is ambiguous, propose 2 options and let the human (Nha/Edward) choose — do not silently pick.
7. **Mobile-first quality floor.** Every section must look intentional at 375px, not just desktop.

---

## 9. Out of Scope (do NOT build)
- Backend, database, auth, CMS
- Contact form with submission
- Blog / articles section
- GitHub repo fetching or contribution graph
- Multi-language toggle (English site is sufficient; VN optional later)
- Analytics, cookie banners, third-party embeds
