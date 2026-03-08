# Бриллиант Души / Diamond of the Soul — Personal Brand Landing Page

## Overview
A mystical dark-themed bilingual (English/Russian) landing page for esoteric ritual cleansing services — wax cleansing, lead cleansing, and ritual magic. Single-page application with no user accounts or checkout — all CTAs redirect to contact an assistant via Telegram.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Animations**: Framer Motion + CSS negativity-cleansing animations
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
│   ├── Navbar.tsx       # Fixed nav with language toggle, magical scroll
│   ├── HeroSection.tsx  # Full-screen hero with golden shimmer title
│   ├── AboutSection.tsx # Personal journey story with credentials
│   ├── ServicesSection.tsx # Ritual service cards with negativity-cleansing animations
│   └── Footer.tsx       # Social links + contact + legal links
├── pages/
│   ├── landing.tsx      # Main landing page with golden mist orbs
│   ├── legal.tsx        # Placeholder legal pages (privacy, terms, refund)
│   └── not-found.tsx    # 404 page
└── index.css            # Theme variables + all custom animations

client/public/images/    # Generated images for hero, about, services
shared/schema.ts         # Minimal schema (contact form type only)
server/                  # Minimal Express server
```

## Design System
- **Brand**: "Бриллиант Души" (RU) / "Diamond of the Soul" (EN)
- **Theme**: Dark mystical with gold tones
- **Primary color**: #c9a227 (gold)
- **Muted text**: #8a7d6b
- **Card borders**: #3d3520
- **Button text on gold**: #0c0a06
- **Fonts**: Playfair Display (headings), Inter (body)
- **Title effect**: Golden shimmer (animated gradient text)
- **Effects**: CSS glow text, glow borders, gradient overlays, golden mist orbs
- **Social icons**: Gold glow hover effect with drop-shadow

## Service Cards & Animations
Three ritual service cards with unique negativity-cleansing hover effects:
1. **Wax Cleansing** (wax-card): Slow 2s gentle fade — negativity layer dissolves softly, card glows with gentle golden light, CTA pulse animation
2. **Lead Cleansing** (lead-card): Instant 0.15s sharp snap — negativity ripped away, bright golden flash
3. **Ritual Magic** (ritual-card): 1.2s swirl — negativity rotates and scales away mysteriously

All cards share:
- Dark smoky negativity-layer overlay that fades on hover
- Diamond shimmer border animation on hover
- Negativity slowly returns when mouse leaves
- focus-within support for keyboard accessibility
- prefers-reduced-motion handling

## Other Visual Effects
- **Golden mist**: 3 floating orbs across the page background (subtle atmospheric haze)
- **Magical scroll**: Nav click triggers golden mist flash + smooth scroll + section glow pulse
- **Nav hover**: Gold text-shadow glow on navigation links

## Key Features
- Bilingual EN/RU with localStorage persistence and html lang attribute sync
- Smooth scroll navigation with magical golden transitions
- Responsive mobile menu
- Russian text overflow handled with break-words
- Social links: Telegram, YouTube, VK, Max
- Legal footer links: Privacy, Terms of Service, Terms of Use, Refund Policy
- All CTAs open Telegram contact link (placeholder: https://t.me/)

## Routes
- `/` - Main landing page
- `/privacy` - Privacy Policy placeholder
- `/terms-of-service` - Terms of Service placeholder
- `/terms-of-use` - Terms of Use placeholder
- `/refund-policy` - Refund Policy placeholder
