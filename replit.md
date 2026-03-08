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
│   ├── FadeInWhenVisible.tsx  # Shared scroll animation component
│   ├── Navbar.tsx       # Fixed nav with language toggle, mobile menu
│   ├── HeroSection.tsx  # Full-screen hero with cosmic background
│   ├── AboutSection.tsx # Personal journey story with credentials
│   ├── ServicesSection.tsx # Service cards with pricing and CTAs
│   └── Footer.tsx       # Social links + contact + legal links
├── pages/
│   ├── landing.tsx      # Main landing page composing all sections
│   ├── legal.tsx        # Placeholder legal pages (privacy, terms, refund)
│   └── not-found.tsx    # 404 page
└── index.css            # Theme variables (dark gold palette)

client/public/images/    # Generated images for hero, about, services
shared/schema.ts         # Minimal schema (contact form type only)
server/                  # Minimal Express server
```

## Design System
- **Theme**: Dark mystical with gold tones
- **Primary color**: #c9a227 (gold)
- **Muted text**: #8a7d6b
- **Card borders**: #3d3520
- **Button text on gold**: #0c0a06
- **Fonts**: Playfair Display (headings), Inter (body)
- **Effects**: CSS glow text (gold), glow borders, gradient overlays
- **Social icons**: Gold glow hover effect with drop-shadow

## Key Features
- Bilingual EN/RU with localStorage persistence and html lang attribute sync
- Smooth scroll navigation
- Responsive mobile menu
- Service cards with placeholder pricing ($150, $200, $350)
- Russian text overflow handled with break-words
- Social links: Telegram, YouTube, VK, Max
- Legal footer links: Privacy, Terms of Service, Terms of Use, Refund Policy
- All CTAs open Telegram contact link

## Routes
- `/` - Main landing page
- `/privacy` - Privacy Policy placeholder
- `/terms-of-service` - Terms of Service placeholder
- `/terms-of-use` - Terms of Use placeholder
- `/refund-policy` - Refund Policy placeholder
