# Nha Tran — Personal Portfolio

A clean, professional portfolio for **Tran Thi Bich Nha**, Financial Operations specialist. Built with React 18 + Vite + Tailwind CSS + Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Update Content

### Replace your CV

1. Drop your PDF file into the `public/` folder
2. Rename it to exactly `CV_NhaTran_EN.pdf`
3. The "Download CV" button will work automatically

### Add or Edit Projects

Edit `src/data/projects.json`. Each project has this structure:

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "category": "Financial Modeling",
  "tools": ["Tool 1", "Tool 2"],
  "description": "One sentence description.",
  "result": "Key outcome or result."
}
```

**Categories available:** `Financial Modeling`, `Research`, `Operations`

### Edit Skills

Edit `src/data/skills.json`. Add or remove skills within the existing groups (Operations, Analytical, Tools).

### Edit About / Experience text

The copy is in the component files:
- About paragraphs: `src/components/About.jsx`
- Experience entries: `src/components/Experience.jsx`
- Contact info: `src/components/Contact.jsx`

## Deployment (Vercel)

1. Push this repository to GitHub (using Nha's account)
2. Go to [vercel.com](https://vercel.com) → Login with Nha's GitHub
3. Click **"New Project"** → Import this repository
4. Vercel auto-detects Vite — click **Deploy**
5. Done. Vercel will redeploy automatically on every push to `main`

> **Note:** No Vercel CLI needed. No `vercel.json` needed for this static build.

## Project Structure

```
src/
├── components/     # All React components
├── data/           # Static JSON content
│   ├── projects.json
│   └── skills.json
├── hooks/
│   └── useReducedMotion.js
├── styles/
│   └── tokens.css  # Design token CSS variables
├── App.jsx
├── index.css
└── main.jsx
public/
├── favicon.svg
└── CV_NhaTran_EN.pdf   ← Replace with your actual CV
```

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v3.4** (utility-first styling)
- **Framer Motion** (animations — respects `prefers-reduced-motion`)
- **Lucide React** (icons)
- **Google Fonts**: Fraunces · Inter · JetBrains Mono
