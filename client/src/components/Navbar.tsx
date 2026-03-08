import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

let activeFlash: HTMLElement | null = null;
let flashTimer: ReturnType<typeof setTimeout> | null = null;
let glowTimer1: ReturnType<typeof setTimeout> | null = null;
let glowTimer2: ReturnType<typeof setTimeout> | null = null;

function triggerMagicalScroll(id: string) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const target = document.getElementById(id);
  if (!target) return;

  if (prefersReduced) {
    target.scrollIntoView({ behavior: "auto" });
    return;
  }

  if (activeFlash) {
    activeFlash.remove();
    activeFlash = null;
  }
  if (flashTimer) clearTimeout(flashTimer);
  if (glowTimer1) clearTimeout(glowTimer1);
  if (glowTimer2) clearTimeout(glowTimer2);

  const flash = document.createElement("div");
  flash.className = "scroll-mist-flash";
  document.body.appendChild(flash);
  activeFlash = flash;

  target.scrollIntoView({ behavior: "smooth" });

  glowTimer1 = setTimeout(() => {
    target.classList.add("section-glow");
    glowTimer2 = setTimeout(() => target.classList.remove("section-glow"), 1500);
  }, 400);

  flashTimer = setTimeout(() => {
    flash.remove();
    activeFlash = null;
  }, 850);
}

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    triggerMagicalScroll(id);
  }, []);

  const navLinks = [
    { label: t("nav.about"), id: "about" },
    { label: t("nav.services"), id: "services" },
    { label: t("nav.contact"), id: "contact" },
  ];

  return (
    <nav
      data-testid="navbar"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <button
          data-testid="link-home"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-xl tracking-wider"
        >
          <span className="glow-text golden-shimmer" style={{ color: "#c9a227" }}>{t("brand.name")}</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              data-testid={`link-nav-${link.id}`}
              onClick={() => scrollTo(link.id)}
              className="text-sm tracking-widest uppercase nav-link-gold rounded-md px-2 py-1"
              style={{ color: "#8a7d6b" }}
            >
              {link.label}
            </button>
          ))}
          <button
            data-testid="button-lang-toggle"
            aria-label={lang === "en" ? "Switch to Russian" : "Switch to English"}
            onClick={() => setLang(lang === "en" ? "ru" : "en")}
            className="flex items-center gap-1.5 text-sm nav-link-gold rounded-md px-2 py-1"
            style={{ color: "#8a7d6b" }}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase tracking-wider">{lang === "en" ? "RU" : "EN"}</span>
          </button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          data-testid="button-mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  data-testid={`link-mobile-nav-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm tracking-widest uppercase text-left py-2 nav-link-gold"
                  style={{ color: "#8a7d6b" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="button-mobile-lang-toggle"
                aria-label={lang === "en" ? "Switch to Russian" : "Switch to English"}
                onClick={() => setLang(lang === "en" ? "ru" : "en")}
                className="flex items-center gap-1.5 text-sm py-2 nav-link-gold"
                style={{ color: "#8a7d6b" }}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase tracking-wider">{lang === "en" ? "Русский" : "English"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
