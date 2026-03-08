import { useI18n } from "@/lib/i18n";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  privacy: "footer.legal.privacy",
  "terms-of-service": "footer.legal.offer",
  "terms-of-use": "footer.legal.terms",
  "refund-policy": "footer.legal.refund",
};

export default function LegalPage() {
  const { t } = useI18n();
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";
  const titleKey = pageTitles[slug] || "footer.legal.privacy";

  return (
    <div data-testid="page-legal" className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1
          data-testid="text-legal-title"
          className="font-serif text-3xl md:text-4xl font-bold mb-6 glow-text"
          style={{ color: "#c9a227" }}
        >
          {t(titleKey)}
        </h1>
        <p
          data-testid="text-legal-placeholder"
          className="text-lg mb-10 leading-relaxed"
          style={{ color: "#8a7d6b" }}
        >
          {t("legal.placeholder")}
        </p>
        <a href="/">
          <Button
            data-testid="button-legal-back"
            variant="outline"
            className="border"
            style={{
              borderColor: "rgba(201, 162, 39, 0.3)",
              color: "#c9a227",
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("legal.back")}
          </Button>
        </a>
      </div>
    </div>
  );
}
