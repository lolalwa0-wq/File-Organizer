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
        className="rounded-md group h-full"
        style={{
          backgroundColor: "rgba(201, 162, 39, 0.04)",
          borderColor: "#3d3520",
        }}
      >
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-md">
          <img
            src={service.image}
            alt={t(service.titleKey)}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(12, 10, 6, 0.9), rgba(12, 10, 6, 0.4), transparent)" }}
          />
          <div className="absolute bottom-4 left-5">
            <span
              data-testid={`text-price-${service.id}`}
              className="font-serif text-3xl font-bold glow-text-gold"
              style={{ color: "#c9a227" }}
            >
              {t(service.priceKey)}
            </span>
          </div>
        </div>

        <CardContent className="p-5 md:p-6">
          <h3
            data-testid={`text-service-title-${service.id}`}
            className="font-serif text-xl md:text-2xl font-semibold mb-3"
            style={{ color: "#c9a227" }}
          >
            {t(service.titleKey)}
          </h3>
          <p
            data-testid={`text-service-desc-${service.id}`}
            className="leading-relaxed mb-5 text-sm md:text-base break-words"
            style={{ color: "#8a7d6b", overflowWrap: "break-word", wordWrap: "break-word" }}
          >
            {t(service.descKey)}
          </p>

          <div className="flex flex-col gap-2 mb-5 text-sm" style={{ color: "#8a7d6b" }}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(201, 162, 39, 0.6)" }} />
              <span data-testid={`text-duration-${service.id}`} className="break-words" style={{ overflowWrap: "break-word" }}>
                {t(service.durationKey)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(201, 162, 39, 0.6)" }} />
              <span data-testid={`text-format-${service.id}`} className="break-words" style={{ overflowWrap: "break-word" }}>
                {t(service.formatKey)}
              </span>
            </div>
          </div>

          <Button
            data-testid={`button-book-${service.id}`}
            className="w-full border tracking-wider uppercase text-xs glow-border"
            style={{
              backgroundColor: "#c9a227",
              borderColor: "rgba(201, 162, 39, 0.4)",
              color: "#0c0a06",
            }}
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
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.03), transparent)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "rgba(201, 162, 39, 0.7)" }}>
              {t("services.subtitle")}
            </p>
            <h2
              data-testid="text-services-title"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold glow-text"
              style={{ color: "#c9a227" }}
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
            className="text-center text-sm max-w-xl mx-auto"
            style={{ color: "#8a7d6b" }}
          >
            {t("services.note")}
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
