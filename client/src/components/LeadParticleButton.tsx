import { useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

const CONTACT_URL = "https://t.me/";

const SHARD_CLIPS = [
  "polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)",
  "polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "polygon(20% 0%, 80% 0%, 100% 60%, 60% 100%, 0% 80%)",
  "polygon(40% 0%, 100% 20%, 80% 100%, 0% 60%)",
  "polygon(0% 0%, 100% 30%, 70% 100%, 10% 80%)",
];

export function LeadParticleButton() {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const createShardParticle = useCallback((btn: HTMLButtonElement, container: HTMLDivElement) => {
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * btn.offsetWidth;
    const startY = Math.random() * btn.offsetHeight;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 60;
    const flyX = Math.cos(angle) * distance;
    const flyY = Math.sin(angle) * distance;
    const rotation = (Math.random() - 0.5) * 720;
    const duration = Math.random() * 400 + 300;
    const clip = SHARD_CLIPS[Math.floor(Math.random() * SHARD_CLIPS.length)];

    const r = Math.floor(Math.random() * 30 + 25);
    const g = Math.floor(Math.random() * 30 + 25);
    const b = Math.floor(Math.random() * 15 + 35);

    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size * (0.6 + Math.random() * 0.8)}px;
      clip-path: ${clip};
      background: linear-gradient(
        ${Math.random() * 360}deg,
        rgba(${r}, ${g}, ${b}, 0.95) 0%,
        rgba(${r + 20}, ${g + 20}, ${b + 10}, 0.7) 50%,
        rgba(${r - 10}, ${g - 10}, ${b}, 0.5) 100%
      );
      pointer-events: none;
      z-index: 5;
      box-shadow:
        0 0 ${size / 3}px rgba(60, 60, 75, 0.5),
        inset 0 0 ${size / 4}px rgba(120, 120, 140, 0.2);
      animation: leadShardExplode ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      --fly-x: ${flyX}px;
      --fly-y: ${flyY}px;
      --spin: ${rotation}deg;
    `;

    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration + 50);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const overlay = darkOverlayRef.current;
    const btn = buttonRef.current;
    const container = particleContainerRef.current;
    const flash = flashRef.current;
    if (!overlay || !btn || !container || !flash) return;

    const shardCount = Math.floor(Math.random() * 10) + 30;
    for (let i = 0; i < shardCount; i++) {
      createShardParticle(btn, container);
    }

    overlay.style.transition = "opacity 0.25s ease-out";
    overlay.style.opacity = "0";

    flash.style.transition = "none";
    flash.style.opacity = "1";
    requestAnimationFrame(() => {
      flash.style.transition = "opacity 0.4s ease-out";
      flash.style.opacity = "0";
    });

    btn.style.transition = "border-color 0.3s ease-out, box-shadow 0.3s ease-out";
    btn.style.borderColor = "rgba(201, 162, 39, 0.7)";
    btn.style.boxShadow =
      "0 0 30px rgba(201, 162, 39, 0.4), 0 0 70px rgba(201, 162, 39, 0.2)";
  }, [createShardParticle]);

  const handleMouseLeave = useCallback(() => {
    const overlay = darkOverlayRef.current;
    const btn = buttonRef.current;
    if (!overlay || !btn) return;

    overlay.style.transition = "opacity 4.5s ease-in";
    overlay.style.opacity = "1";

    btn.style.transition = "border-color 4.5s ease-in, box-shadow 4.5s ease-in";
    btn.style.borderColor = "rgba(201, 162, 39, 0.15)";
    btn.style.boxShadow = "none";
  }, []);

  return (
    <button
      ref={buttonRef}
      data-testid="button-book-lead"
      className="cta-button lead-cta w-full"
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
        className="lead-dark-overlay"
      />
      <div
        ref={flashRef}
        className="lead-golden-flash"
        style={{
          position: "absolute",
          inset: "-5px",
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 6,
          opacity: 0,
          background: "radial-gradient(circle, rgba(201, 162, 39, 0.6) 0%, rgba(255, 223, 100, 0.3) 40%, transparent 70%)",
        }}
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
