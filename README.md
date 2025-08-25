# Nikunj kanteliya — Portfolio

<!-- Live site: https://darshangohel-portfolio.netlify.app/ -->

A modern, animated, and accessible developer portfolio built with React + TypeScript, MUI, and GSAP. Content is JSON-driven for easy edits.

## Tech Stack
- React 18 + TypeScript (Vite)
- Material UI (MUI) theming with light/dark mode
- GSAP + ScrollTrigger animations (with prefers-reduced-motion support)
- Keen Slider (3D skills carousel)


## Features
- Responsive sections: Hero, About, My Work (Experience, Projects, Testimonials), Contact, Footer
- Top, centered pill-style Navbar with active indicator
- Smooth entrance and hover animations
- SpeedDial quick actions: theme toggle and SplashCursor toggle
- Themed, minimal scrollbars
- Contact form powered by Netlify Forms

## Getting Started
Prerequisites: Node.js 18+

Install and run:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Content Editing
Most copy lives in JSON under `src/data/`:
- `hero.json`, `about.json`, `experience.json`, `projects.json`, `testimonials.json`, `contact.json`, `footer.json`

Other tweaks:
- Resume: place `resume.pdf` in `public/` (used by the Hero button)
- Footer tech/socials/email: `src/data/footer.json`

## Netlify Forms
Already configured. For SPA detection, a hidden form exists in `index.html` and the React form includes the required `data-netlify` attributes and hidden inputs. Deploy to Netlify and submissions will appear in the Forms dashboard.

## Deployment
One-click deploy to Netlify recommended. Default Vite build (`npm run build`) outputs to `dist/`.

## Credits
- React Bits community for inspiration/components: https://reactbits.dev/

## License
Open-sourced under the MIT license.
