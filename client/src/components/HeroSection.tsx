import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      data-testid="section-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p
            data-testid="text-hero-subtitle"
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6"
            style={{ color: "rgba(201, 162, 39, 0.8)" }}
          >
            {t("hero.subtitle")}
          </p>
          <h1
            data-testid="text-hero-title"
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="glow-text golden-shimmer" style={{ color: "#c9a227" }}>
              {t("brand.name")}
            </span>
          </h1>
        </motion.div>

        <motion.p
          data-testid="text-hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: "rgba(201, 162, 39, 0.5)" }}
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            data-testid="button-hero-cta"
            size="lg"
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border px-8 tracking-wider uppercase text-sm glow-border"
            style={{
              backgroundColor: "#c9a227",
              borderColor: "rgba(201, 162, 39, 0.4)",
              color: "#0c0a06",
            }}
          >
            {t("hero.cta")}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" style={{ color: "rgba(201, 162, 39, 0.4)" }} />
      </motion.div>
    </section>
  );
}
