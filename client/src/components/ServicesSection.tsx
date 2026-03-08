import { useI18n } from "@/lib/i18n";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { WaxParticleButton } from "@/components/WaxParticleButton";
import { LeadParticleButton } from "@/components/LeadParticleButton";
import { RitualParticleButton } from "@/components/RitualParticleButton";

interface ServiceData {
  id: string;
  cardClass: string;
  titleKey: string;
  descKey: string;
  image: string;
}

const services: ServiceData[] = [
  {
    id: "wax",
    cardClass: "wax-card",
    titleKey: "services.wax.title",
    descKey: "services.wax.desc",
    image: "/images/service-energy.png",
  },
  {
    id: "lead",
    cardClass: "lead-card",
    titleKey: "services.lead.title",
    descKey: "services.lead.desc",
    image: "/images/service-therapy.png",
  },
  {
    id: "ritual",
    cardClass: "ritual-card",
    titleKey: "services.ritual.title",
    descKey: "services.ritual.desc",
    image: "/images/service-session.png",
  },
];

const CONTACT_URL = "https://t.me/";

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  const { t } = useI18n();

  return (
    <FadeInWhenVisible delay={0.1 + index * 0.15}>
      <div
        data-testid={`card-service-${service.id}`}
        className={`service-card ${service.cardClass} relative rounded-md border overflow-hidden h-full flex flex-col`}
        style={{
          backgroundColor: "rgba(201, 162, 39, 0.04)",
          borderColor: "#3d3520",
        }}
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={service.image}
            alt={t(service.titleKey)}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(12, 10, 6, 0.9), rgba(12, 10, 6, 0.4), transparent)" }}
          />
        </div>

        <div className="relative p-5 md:p-6 flex flex-col flex-1">
          <h3
            data-testid={`text-service-title-${service.id}`}
            className="font-serif text-xl md:text-2xl font-semibold mb-3"
            style={{ color: "#c9a227" }}
          >
            {t(service.titleKey)}
          </h3>
          <p
            data-testid={`text-service-desc-${service.id}`}
            className="leading-relaxed mb-5 text-sm md:text-base break-words flex-1"
            style={{ color: "#8a7d6b", overflowWrap: "break-word", wordWrap: "break-word" }}
          >
            {t(service.descKey)}
          </p>

          {service.id === "wax" ? (
            <WaxParticleButton />
          ) : service.id === "lead" ? (
            <LeadParticleButton />
          ) : (
            <RitualParticleButton />
          )}
        </div>
      </div>
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
