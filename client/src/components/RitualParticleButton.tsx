import { useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const CONTACT_URL = "https://t.me/";
const SWEEP_DURATION = 1350;
const RETURN_DURATION = 5000;
const FLAME_TONGUE_COUNT = 10;

export function RitualParticleButton() {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const fireGlowRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const sweepProgressRef = useRef(0);
  const isHoveringRef = useRef(false);
  const lastParticleTimeRef = useRef(0);
  const flameTonguesRef = useRef<HTMLDivElement[]>([]);

  const createFlameTongues = useCallback((container: HTMLDivElement, btnHeight: number) => {
    flameTonguesRef.current.forEach(t => t.remove());
    flameTonguesRef.current = [];

    for (let i = 0; i < FLAME_TONGUE_COUNT; i++) {
      const tongue = document.createElement("div");
      const h = Math.random() * 20 + 15;
      const w = Math.random() * 7 + 8;
      const yPos = (i / FLAME_TONGUE_COUNT) * btnHeight + (Math.random() - 0.5) * 8;
      const wiggleDuration = Math.random() * 100 + 80;
      const wiggleDelay = Math.random() * 100;

      tongue.style.cssText = `
        position: absolute;
        left: 0;
        top: ${yPos}px;
        width: ${w}px;
        height: ${h}px;
        pointer-events: none;
        z-index: 7;
        border-radius: 0 80% 0 80%;
        transform: rotate(-45deg);
        background: radial-gradient(
          ellipse at 30% 70%,
          #fff7a0 0%,
          #ffa500 30%,
          #ff4500 60%,
          #8b0000 85%,
          transparent 100%
        );
        filter: blur(${1 + Math.random()}px);
        mix-blend-mode: screen;
        opacity: 0.9;
        animation: flameTongueWiggle ${wiggleDuration}ms ease-in-out ${wiggleDelay}ms infinite alternate;
      `;

      container.appendChild(tongue);
      flameTonguesRef.current.push(tongue);
    }
  }, []);

  const removeFlameTongues = useCallback(() => {
    flameTonguesRef.current.forEach(t => t.remove());
    flameTonguesRef.current = [];
  }, []);

  const createAshParticle = useCallback((btn: HTMLButtonElement, container: HTMLDivElement, flameX: number) => {
    const size = Math.random() * 4 + 2;
    const startX = flameX + (Math.random() - 0.5) * 25;
    const startY = Math.random() * btn.offsetHeight;
    const driftX = (Math.random() - 0.5) * 50;
    const duration = Math.random() * 600 + 600;
    const isEmber = Math.random() > 0.45;
    const spin = (Math.random() - 0.5) * 360;

    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size * (0.6 + Math.random() * 0.6)}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "1px"};
      background: ${isEmber
        ? `radial-gradient(circle, rgba(255, 160, 40, 0.95) 0%, rgba(220, 100, 20, 0.7) 50%, rgba(180, 60, 10, 0.3) 100%)`
        : `rgba(${55 + Math.random() * 25}, ${45 + Math.random() * 15}, ${38 + Math.random() * 12}, ${0.7 + Math.random() * 0.25})`
      };
      pointer-events: none;
      z-index: 5;
      ${isEmber ? `box-shadow: 0 0 ${size + 1}px rgba(255, 140, 30, 0.6), 0 0 ${size * 2}px rgba(220, 100, 20, 0.25);` : ""}
      animation: ritualAshFall ${duration}ms ease-in forwards;
      --drift-x: ${driftX}px;
      --spin: ${spin}deg;
    `;

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration + 50);
  }, []);

  const createSmokeWisp = useCallback((btn: HTMLButtonElement, container: HTMLDivElement, flameX: number) => {
    const size = Math.random() * 8 + 4;
    const startX = flameX + (Math.random() - 0.5) * 15;
    const startY = Math.random() * btn.offsetHeight * 0.4;
    const driftX = (Math.random() - 0.5) * 25;
    const duration = Math.random() * 600 + 600;

    const wisp = document.createElement("div");
    wisp.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200, 170, 130, 0.12) 0%, rgba(160, 140, 110, 0.04) 60%, transparent 100%);
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
    const container = particleContainerRef.current;
    const glow = fireGlowRef.current;
    if (!btn || !overlay || !container || !glow) return;

    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SWEEP_DURATION, 1);
    sweepProgressRef.current = progress;

    const pct = progress * 100;
    overlay.style.clipPath = `inset(0 0 0 ${pct}%)`;

    const flameX = progress * btn.offsetWidth;
    flameTonguesRef.current.forEach(tongue => {
      tongue.style.left = `${flameX - 10}px`;
    });

    glow.style.left = `${flameX - 30}px`;
    glow.style.opacity = progress < 1 ? "0.7" : "0";

    if (now - lastParticleTimeRef.current > 35) {
      lastParticleTimeRef.current = now;
      const batch = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < batch; i++) {
        createAshParticle(btn, container, flameX);
      }
      if (Math.random() > 0.5) {
        createSmokeWisp(btn, container, flameX);
      }
    }

    if (progress < 1 && isHoveringRef.current) {
      animFrameRef.current = requestAnimationFrame(() => animateSweep(startTime));
    } else if (progress >= 1) {
      removeFlameTongues();
      glow.style.opacity = "0";
      btn.style.borderColor = "rgba(201, 162, 39, 0.5)";
      btn.style.boxShadow = "0 0 25px rgba(201, 162, 39, 0.2), 0 0 60px rgba(201, 162, 39, 0.1)";
    }
  }, [createAshParticle, createSmokeWisp, removeFlameTongues]);

  const animateReturn = useCallback((startTime: number, startProgress: number) => {
    const overlay = darkOverlayRef.current;
    const btn = buttonRef.current;
    if (!overlay || !btn) return;

    const now = performance.now();
    const elapsed = now - startTime;
    const returnProgress = Math.min(elapsed / RETURN_DURATION, 1);
    const currentProgress = startProgress * (1 - returnProgress);
    sweepProgressRef.current = currentProgress;

    const pct = currentProgress * 100;
    overlay.style.clipPath = `inset(0 0 0 ${pct}%)`;

    if (returnProgress < 1 && !isHoveringRef.current) {
      animFrameRef.current = requestAnimationFrame(() => animateReturn(startTime, startProgress));
    } else if (returnProgress >= 1) {
      overlay.style.clipPath = "none";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const btn = buttonRef.current;
    const container = particleContainerRef.current;
    if (!btn || !container) return;

    btn.style.transition = "border-color 1.3s ease-in-out, box-shadow 1.3s ease-in-out";
    btn.style.borderColor = "rgba(201, 162, 39, 0.3)";
    btn.style.boxShadow = "0 0 10px rgba(201, 162, 39, 0.1)";

    createFlameTongues(container, btn.offsetHeight);

    lastParticleTimeRef.current = 0;
    const startTime = performance.now();
    animFrameRef.current = requestAnimationFrame(() => animateSweep(startTime));
  }, [animateSweep, createFlameTongues]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    removeFlameTongues();

    const btn = buttonRef.current;
    const glow = fireGlowRef.current;
    if (!btn) return;
    if (glow) glow.style.opacity = "0";

    btn.style.transition = "border-color 5s ease-in, box-shadow 5s ease-in";
    btn.style.borderColor = "rgba(201, 162, 39, 0.15)";
    btn.style.boxShadow = "none";

    const currentProgress = sweepProgressRef.current;
    if (currentProgress > 0) {
      const startTime = performance.now();
      animFrameRef.current = requestAnimationFrame(() => animateReturn(startTime, currentProgress));
    }
  }, [animateReturn, removeFlameTongues]);

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
        ref={fireGlowRef}
        className="ritual-fire-glow"
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
