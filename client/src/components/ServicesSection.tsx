import { useI18n } from "@/lib/i18n";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { ArrowRight, Clock, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceData {
  id: string;
  titleKey: string;
  descKey: string;
  durationKey: string;
  formatKey: string;
  priceKey: string;
  image: string;
}

const services: ServiceData[] = [
  {
    id: "energy",
    titleKey: "services.energy.title",
    descKey: "services.energy.desc",
    durationKey: "services.energy.duration",
    formatKey: "services.energy.format",
    priceKey: "services.energy.price",
    image: "/images/service-energy.png",
  },
  {
    id: "therapy",
    titleKey: "services.therapy.title",
    descKey: "services.therapy.desc",
    durationKey: "services.therapy.duration",
    formatKey: "services.therapy.format",
    priceKey: "services.therapy.price",
    image: "/images/service-therapy.png",
  },
  {
    id: "session",
    titleKey: "services.session.title",
    descKey: "services.session.desc",
    durationKey: "services.session.duration",
    formatKey: "services.session.format",
    priceKey: "services.session.price",
    image: "/images/service-session.png",
  },
];

const CONTACT_URL = "https://t.me/";

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  const { t } = useI18n();

  return (
    <FadeInWhenVisible delay={0.1 + index * 0.15}>
      <Card
        data-testid={`card-service-${service.id}`}
        className="bg-purple-950/20 border-purple-500/15 rounded-md group"
      >
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-md">
          <img
            src={service.image}
            alt={t(service.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/40 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <span
              data-testid={`text-price-${service.id}`}
              className="font-serif text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent glow-text-gold"
            >
              {t(service.priceKey)}
            </span>
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <h3
            data-testid={`text-service-title-${service.id}`}
            className="font-serif text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-100 to-white bg-clip-text text-transparent"
          >
            {t(service.titleKey)}
          </h3>
          <p
            data-testid={`text-service-desc-${service.id}`}
            className="text-foreground/60 leading-relaxed mb-6 text-sm md:text-base"
          >
            {t(service.descKey)}
          </p>

          <div className="flex flex-col gap-2 mb-6 text-sm text-foreground/50">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400/60" />
              <span data-testid={`text-duration-${service.id}`}>{t(service.durationKey)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-400/60" />
              <span data-testid={`text-format-${service.id}`}>{t(service.formatKey)}</span>
            </div>
          </div>

          <Button
            data-testid={`button-book-${service.id}`}
            className="w-full bg-purple-600/70 border border-purple-400/25 text-white tracking-wider uppercase text-xs glow-border"
            onClick={() => window.open(CONTACT_URL, "_blank")}
          >
            {t("services.cta")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </FadeInWhenVisible>
  );
}

export function ServicesSection() {
  const { t } = useI18n();

  return (
    <section
      id="services"
      data-testid="section-services"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.3em] uppercase text-purple-400/70 mb-4">
              {t("services.subtitle")}
            </p>
            <h2
              data-testid="text-services-title"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold glow-text bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent"
            >
              {t("services.title")}
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <FadeInWhenVisible delay={0.5}>
          <p
            data-testid="text-services-note"
            className="text-center text-sm text-muted-foreground/70 max-w-xl mx-auto"
          >
            {t("services.note")}
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
