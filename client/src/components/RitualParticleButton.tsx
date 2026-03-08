import { useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const CONTACT_URL = "https://t.me/";
const SWEEP_DURATION = 2500;
const RETURN_DURATION = 5500;

export function RitualParticleButton() {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const flameEdgeRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const sweepProgressRef = useRef(0);
  const isHoveringRef = useRef(false);
  const lastParticleTimeRef = useRef(0);

  const createAshParticle = useCallback((btn: HTMLButtonElement, container: HTMLDivElement, flameX: number) => {
    const size = Math.random() * 5 + 3;
    const startX = flameX + (Math.random() - 0.5) * 20;
    const startY = Math.random() * btn.offsetHeight;
    const driftX = (Math.random() - 0.5) * 40;
    const duration = Math.random() * 1000 + 1000;
    const isEmber = Math.random() > 0.5;

    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: ${Math.random() > 0.4 ? "50%" : "2px"};
      background: ${isEmber
        ? `radial-gradient(circle, rgba(220, 120, 30, 0.9) 0%, rgba(180, 80, 20, 0.6) 60%, transparent 100%)`
        : `rgba(${50 + Math.random() * 20}, ${40 + Math.random() * 15}, ${35 + Math.random() * 15}, ${0.7 + Math.random() * 0.25})`
      };
      pointer-events: none;
      z-index: 5;
      ${isEmber ? `box-shadow: 0 0 ${size}px rgba(220, 120, 30, 0.5), 0 0 ${size * 2}px rgba(200, 100, 30, 0.2);` : ""}
      animation: ritualAshFall ${duration}ms ease-in forwards;
      --drift-x: ${driftX}px;
    `;

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration + 50);
  }, []);

  const createSmokeWisp = useCallback((btn: HTMLButtonElement, container: HTMLDivElement, flameX: number) => {
    const size = Math.random() * 8 + 4;
    const startX = flameX + (Math.random() - 0.5) * 15;
    const startY = Math.random() * btn.offsetHeight * 0.5;
    const driftX = (Math.random() - 0.5) * 25;
    const duration = Math.random() * 800 + 800;

    const wisp = document.createElement("div");
    wisp.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(180, 160, 140, 0.15) 0%, rgba(150, 130, 110, 0.05) 60%, transparent 100%);
      pointer-events: none;
      z-index: 5;
      filter: blur(2px);
      animation: ritualSmokeFall ${duration}ms ease-out forwards;
      --drift-x: ${driftX}px;
    `;

    container.appendChild(wisp);
    setTimeout(() => wisp.remove(), duration + 50);
  }, []);

  const animateSweep = useCallback((startTime: number) => {
    const btn = buttonRef.current;
    const overlay = darkOverlayRef.current;
    const flame = flameEdgeRef.current;
    const container = particleContainerRef.current;
    if (!btn || !overlay || !flame || !container) return;

    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SWEEP_DURATION, 1);
    sweepProgressRef.current = progress;

    const pct = progress * 100;
    overlay.style.clipPath = `inset(0 0 0 ${pct}%)`;

    flame.style.left = `${pct}%`;
    flame.style.opacity = progress < 1 ? "1" : "0";

    const flameX = (progress * btn.offsetWidth);
    if (now - lastParticleTimeRef.current > 60) {
      lastParticleTimeRef.current = now;
      const batch = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < batch; i++) {
        createAshParticle(btn, container, flameX);
      }
      if (Math.random() > 0.6) {
        createSmokeWisp(btn, container, flameX);
      }
    }

    if (progress < 1 && isHoveringRef.current) {
      animFrameRef.current = requestAnimationFrame(() => animateSweep(startTime));
    } else if (progress >= 1) {
      flame.style.opacity = "0";
      btn.style.borderColor = "rgba(201, 162, 39, 0.5)";
      btn.style.boxShadow = "0 0 25px rgba(201, 162, 39, 0.2), 0 0 60px rgba(201, 162, 39, 0.1)";
    }
  }, [createAshParticle, createSmokeWisp]);

  const animateReturn = useCallback((startTime: number, startProgress: number) => {
    const overlay = darkOverlayRef.current;
    const flame = flameEdgeRef.current;
    const btn = buttonRef.current;
    if (!overlay || !flame || !btn) return;

    const now = performance.now();
    const elapsed = now - startTime;
    const returnProgress = Math.min(elapsed / RETURN_DURATION, 1);
    const currentProgress = startProgress * (1 - returnProgress);
    sweepProgressRef.current = currentProgress;

    const pct = currentProgress * 100;
    overlay.style.clipPath = `inset(0 0 0 ${pct}%)`;

    if (returnProgress < 0.05) {
      flame.style.left = `${pct}%`;
      flame.style.opacity = "0.4";
    } else {
      flame.style.opacity = "0";
    }

    if (returnProgress < 1 && !isHoveringRef.current) {
      animFrameRef.current = requestAnimationFrame(() => animateReturn(startTime, startProgress));
    } else if (returnProgress >= 1) {
      overlay.style.clipPath = "none";
      flame.style.opacity = "0";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const overlay = darkOverlayRef.current;
    const flame = flameEdgeRef.current;
    const btn = buttonRef.current;
    if (!overlay || !flame || !btn) return;

    btn.style.transition = "border-color 2.5s ease-in-out, box-shadow 2.5s ease-in-out";
    btn.style.borderColor = "rgba(201, 162, 39, 0.3)";
    btn.style.boxShadow = "0 0 10px rgba(201, 162, 39, 0.1)";

    lastParticleTimeRef.current = 0;
    const startTime = performance.now();
    animFrameRef.current = requestAnimationFrame(() => animateSweep(startTime));
  }, [animateSweep]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const btn = buttonRef.current;
    if (!btn) return;

    btn.style.transition = "border-color 5.5s ease-in, box-shadow 5.5s ease-in";
    btn.style.borderColor = "rgba(201, 162, 39, 0.15)";
    btn.style.boxShadow = "none";

    const currentProgress = sweepProgressRef.current;
    if (currentProgress > 0) {
      const startTime = performance.now();
      animFrameRef.current = requestAnimationFrame(() => animateReturn(startTime, currentProgress));
    }
  }, [animateReturn]);

  return (
    <button
      ref={buttonRef}
      data-testid="button-book-ritual"
      className="cta-button ritual-cta w-full"
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
        className="ritual-dark-overlay"
      />
      <div
        ref={flameEdgeRef}
        className="ritual-flame-edge"
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
