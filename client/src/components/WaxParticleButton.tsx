import { useRef, useCallback, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const CONTACT_URL = "https://t.me/";

export function WaxParticleButton() {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);
  const spawnCountRef = useRef(0);

  const createDarkParticle = useCallback(() => {
    const btn = buttonRef.current;
    const container = particleContainerRef.current;
    if (!btn || !container) return;

    const size = Math.random() * 12 + 6;
    const startX = Math.random() * btn.offsetWidth;
    const startY = Math.random() * btn.offsetHeight;
    const driftX = (Math.random() - 0.5) * 80;
    const duration = Math.random() * 2000 + 1500;

    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle,
        rgba(20, 0, 35, 0.9) 0%,
        rgba(35, 5, 50, 0.7) 40%,
        rgba(15, 0, 25, 0.4) 70%,
        transparent 100%
      );
      pointer-events: none;
      z-index: 5;
      box-shadow:
        0 0 ${size / 2}px rgba(20, 0, 35, 0.6),
        0 0 ${size}px rgba(30, 5, 45, 0.3);
      animation: waxParticleFall ${duration}ms ease-in forwards;
      --drift-x: ${driftX}px;
    `;

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    spawnCountRef.current = 0;
    const overlay = darkOverlayRef.current;
    const btn = buttonRef.current;
    if (!overlay || !btn) return;

    intervalRef.current = setInterval(() => {
      if (!isHoveringRef.current) return;

      const batch = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < batch; i++) {
        createDarkParticle();
      }

      spawnCountRef.current++;
      const progress = Math.min(spawnCountRef.current / 20, 1);
      overlay.style.opacity = String(1 - progress);

      if (spawnCountRef.current > 25) {
        overlay.style.opacity = "0";
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 120);

    btn.style.transition = "all 3s ease-in-out";
    btn.style.borderColor = "rgba(201, 162, 39, 0.5)";
    btn.style.boxShadow =
      "0 0 20px rgba(201, 162, 39, 0.15), 0 0 50px rgba(201, 162, 39, 0.08)";
  }, [createDarkParticle]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const overlay = darkOverlayRef.current;
    const btn = buttonRef.current;
    if (!overlay || !btn) return;

    overlay.style.transition = "opacity 5s ease-in";
    overlay.style.opacity = "1";

    btn.style.transition = "all 5s ease-in";
    btn.style.borderColor = "rgba(201, 162, 39, 0.15)";
    btn.style.boxShadow = "none";
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      data-testid="button-book-wax"
      className="cta-button wax-cta w-full"
      onClick={() => window.open(CONTACT_URL, "_blank")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="cta-text tracking-wider uppercase text-xs flex items-center justify-center gap-2">
        {t("services.cta")}
        <ArrowRight className="w-4 h-4" />
      </span>
      <div
        ref={darkOverlayRef}
        className="wax-dark-overlay"
      />
      <div
        ref={particleContainerRef}
        className="negativity-particles"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 4,
          overflow: "visible",
          borderRadius: "inherit",
        }}
      />
    </button>
  );
}
