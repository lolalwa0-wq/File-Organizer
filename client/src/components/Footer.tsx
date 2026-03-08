import { useI18n } from "@/lib/i18n";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { SiTelegram, SiYoutube, SiVk } from "react-icons/si";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_URL = "https://t.me/";

const socialLinks = [
  { icon: SiTelegram, label: "Telegram", url: "https://t.me/", testId: "link-telegram" },
  { icon: SiYoutube, label: "YouTube", url: "https://youtube.com/", testId: "link-youtube" },
  { icon: SiVk, label: "VK", url: "https://vk.com/", testId: "link-vk" },
  { icon: MessageCircle, label: "Max", url: "#", testId: "link-max" },
];

export function Footer() {
  const { t } = useI18n();

  const legalLinks = [
    { labelKey: "footer.legal.privacy", href: "/privacy" },
    { labelKey: "footer.legal.offer", href: "/terms-of-service" },
    { labelKey: "footer.legal.terms", href: "/terms-of-use" },
    { labelKey: "footer.legal.refund", href: "/refund-policy" },
  ];

  return (
    <footer
      id="contact"
      data-testid="section-footer"
      className="relative py-24 md:py-32"
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.04), rgba(201, 162, 39, 0.06))" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2
              data-testid="text-footer-title"
              className="font-serif text-4xl md:text-5xl font-bold mb-6 glow-text"
              style={{ color: "#c9a227" }}
            >
              {t("footer.connect")}
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div
            className="rounded-md border p-8 md:p-12 mb-16 text-center glow-border"
            style={{
              borderColor: "rgba(201, 162, 39, 0.15)",
              backgroundColor: "rgba(201, 162, 39, 0.04)",
            }}
          >
            <h3
              data-testid="text-contact-title"
              className="font-serif text-2xl md:text-3xl font-semibold mb-4"
              style={{ color: "#c9a227" }}
            >
              {t("footer.contact")}
            </h3>
            <p
              data-testid="text-contact-desc"
              className="mb-8 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#8a7d6b" }}
            >
              {t("footer.contact.desc")}
            </p>
            <Button
              data-testid="button-contact-cta"
              size="lg"
              className="border px-8 tracking-wider uppercase text-sm glow-border"
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
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="flex justify-center gap-6 mb-16">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                data-testid={social.testId}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className="w-12 h-12 rounded-md border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: "rgba(201, 162, 39, 0.2)",
                    backgroundColor: "rgba(201, 162, 39, 0.05)",
                  }}
                >
                  <social.icon
                    className="w-5 h-5 social-icon-hover"
                    style={{ color: "rgba(201, 162, 39, 0.6)" }}
                  />
                </div>
                <span className="text-xs tracking-wider" style={{ color: "#8a7d6b" }}>{social.label}</span>
              </a>
            ))}
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {legalLinks.map((link) => (
              <a
                key={link.labelKey}
                data-testid={`link-legal-${link.href.slice(1)}`}
                href={link.href}
                className="text-xs tracking-wider transition-colors duration-300"
                style={{ color: "#8a7d6b" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a227")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7d6b")}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
        </FadeInWhenVisible>

        <div className="border-t pt-8" style={{ borderColor: "rgba(201, 162, 39, 0.1)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: "rgba(138, 125, 107, 0.6)" }}>
            <p data-testid="text-copyright">
              &copy; {new Date().getFullYear()} LUMINA. {t("footer.rights")}.
            </p>
            <p data-testid="text-made-with" className="italic">
              {t("footer.made")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
