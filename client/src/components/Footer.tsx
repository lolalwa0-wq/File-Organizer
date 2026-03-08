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

  return (
    <footer
      id="contact"
      data-testid="section-footer"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/15 to-purple-950/25" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2
              data-testid="text-footer-title"
              className="font-serif text-4xl md:text-5xl font-bold mb-6 glow-text bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent"
            >
              {t("footer.connect")}
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div className="rounded-md border border-purple-500/15 bg-purple-950/20 p-8 md:p-12 mb-16 text-center glow-border">
            <h3
              data-testid="text-contact-title"
              className="font-serif text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-100 to-white bg-clip-text text-transparent"
            >
              {t("footer.contact")}
            </h3>
            <p
              data-testid="text-contact-desc"
              className="text-foreground/50 mb-8 max-w-lg mx-auto leading-relaxed"
            >
              {t("footer.contact.desc")}
            </p>
            <Button
              data-testid="button-contact-cta"
              size="lg"
              className="bg-purple-600/70 border border-purple-400/25 text-white px-8 tracking-wider uppercase text-sm glow-border"
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
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-md border border-purple-500/20 bg-purple-950/30 flex items-center justify-center hover-elevate">
                  <social.icon className="w-5 h-5 text-purple-300/70" />
                </div>
                <span className="text-xs text-muted-foreground/60 tracking-wider">{social.label}</span>
              </a>
            ))}
          </div>
        </FadeInWhenVisible>

        <div className="border-t border-purple-500/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/40">
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
