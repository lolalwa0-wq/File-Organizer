import { useI18n } from "@/lib/i18n";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Sparkles, Star, Heart, Award } from "lucide-react";

export function AboutSection() {
  const { t } = useI18n();

  const credentials = [
    { icon: Star, text: t("about.credentials.1") },
    { icon: Award, text: t("about.credentials.2") },
    { icon: Sparkles, text: t("about.credentials.3") },
    { icon: Heart, text: t("about.credentials.4") },
  ];

  return (
    <section
      id="about"
      data-testid="section-about"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/about-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-400/70 mb-4">
              {t("about.subtitle")}
            </p>
            <h2
              data-testid="text-about-title"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold glow-text bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent"
            >
              {t("about.title")}
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-start mb-20">
          <FadeInWhenVisible delay={0.1}>
            <div className="relative">
              <div className="aspect-[3/4] rounded-md bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20 glow-border flex items-center justify-center">
                <div className="text-center p-6">
                  <Sparkles className="w-12 h-12 text-purple-400/60 mx-auto mb-4 animate-pulse-glow" />
                  <p className="text-sm text-purple-300/50 tracking-wider uppercase">
                    {t("hero.subtitle")}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-md bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/10" />
            </div>
          </FadeInWhenVisible>

          <div className="space-y-6">
            {[
              t("about.story.p1"),
              t("about.story.p2"),
              t("about.story.p3"),
              t("about.story.p4"),
              t("about.story.p5"),
            ].map((paragraph, i) => (
              <FadeInWhenVisible key={i} delay={0.1 + i * 0.08}>
                <p
                  data-testid={`text-about-story-${i}`}
                  className="text-foreground/70 leading-relaxed text-base md:text-lg"
                >
                  {paragraph}
                </p>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>

        <FadeInWhenVisible delay={0.2}>
          <div className="rounded-md border border-purple-500/15 bg-purple-950/20 p-8 md:p-12 mb-16 glow-border">
            <h3
              data-testid="text-philosophy-title"
              className="font-serif text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent"
            >
              {t("about.philosophy.title")}
            </h3>
            <p
              data-testid="text-philosophy"
              className="text-foreground/60 leading-relaxed text-base md:text-lg italic"
            >
              {t("about.philosophy.text")}
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <div>
            <h3
              data-testid="text-credentials-title"
              className="font-serif text-2xl md:text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent"
            >
              {t("about.credentials.title")}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((cred, i) => (
                <FadeInWhenVisible key={i} delay={0.3 + i * 0.1}>
                  <div
                    data-testid={`card-credential-${i}`}
                    className="flex items-start gap-4 p-5 rounded-md border border-purple-500/10 bg-purple-950/15"
                  >
                    <cred.icon className="w-5 h-5 text-purple-400/70 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70 text-sm md:text-base">{cred.text}</span>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
