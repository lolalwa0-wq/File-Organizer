# LUMINA - Personal Brand Landing Page

## Overview
A mystical dark-themed bilingual (English/Russian) landing page for esoteric services including energy cleansings, meta-therapy, and meta-sessions. Single-page application with no user accounts or checkout — all CTAs redirect to contact an assistant.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons (for social platforms)
- **Routing**: Wouter
- **Backend**: Express.js (minimal, serves static frontend only)
- **No Database**: Static content site, no persistence needed

## Project Structure
```
client/src/
├── App.tsx              # Root component with routing and providers
├── lib/
│   └── i18n.tsx         # Bilingual context (EN/RU) with translations
├── components/
│   ├── Navbar.tsx       # Fixed nav with language toggle, mobile menu
│   ├── HeroSection.tsx  # Full-screen hero with cosmic background
│   ├── AboutSection.tsx # Personal journey story with credentials
│   ├── ServicesSection.tsx # Service cards with pricing and CTAs
│   └── Footer.tsx       # Social links (Telegram, YouTube, VK, Max) + contact
├── pages/
│   ├── landing.tsx      # Main landing page composing all sections
│   └── not-found.tsx    # 404 page
└── index.css            # Theme variables (dark mystical purple palette)

client/public/images/    # Generated images for hero, about, services
shared/schema.ts         # Minimal schema (contact form type only)
server/                  # Minimal Express server
```

## Design System
- **Theme**: Dark mystical with deep purple/indigo tones
- **Fonts**: Playfair Display (headings), Inter (body)
- **Effects**: CSS glow text, glow borders, gradient overlays
- **Animations**: Scroll-triggered fade-in, floating elements, pulse glow
- **Colors**: Purple-900/950 backgrounds, purple-400 accents, amber for prices

## Key Features
- Bilingual EN/RU with localStorage persistence
- Smooth scroll navigation
- Responsive mobile menu
- Service cards with placeholder pricing ($150, $200, $350)
- Social links: Telegram, YouTube, VK, Max
- All CTAs open Telegram contact link
