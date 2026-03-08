import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type Language = "en" | "ru";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "brand.name": "Diamond of the Soul",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "hero.subtitle": "Energy Practitioner & Meta-Therapist",
    "hero.tagline": "Unlock the hidden dimensions of your being through ancient wisdom and modern energy practices",
    "hero.cta": "Explore My Services",
    "about.title": "My Journey",
    "about.subtitle": "A Path of Transformation",
    "about.story.p1": "My path into the world of energy practices began with a profound personal crisis that shattered everything I thought I knew about reality. What seemed like an ending became the most powerful beginning of my life.",
    "about.story.p2": "For years, I navigated the conventional world — building a career, pursuing success as society defined it. But beneath the surface, I felt a persistent calling, a whisper from something deeper that I couldn't ignore.",
    "about.story.p3": "The turning point came when I experienced my first energy cleansing session. In that moment, layers of accumulated emotional weight lifted, and I glimpsed the vast, luminous reality that exists beyond our everyday perception.",
    "about.story.p4": "Since then, I have dedicated my life to mastering these ancient arts — studying under remarkable teachers across multiple traditions, deepening my understanding of the subtle energy systems that govern our well-being.",
    "about.story.p5": "Today, I guide others through their own transformative journeys. Each session is a sacred space where healing unfolds naturally, where the wisdom of the universe meets the unique landscape of your soul.",
    "about.philosophy.title": "My Philosophy",
    "about.philosophy.text": "I believe that every person carries within them the blueprint for their own healing. My role is not to fix, but to illuminate — to help you reconnect with the infinite source of wisdom and power that has always been yours.",
    "about.credentials.title": "Experience & Training",
    "about.credentials.1": "10+ years of dedicated practice in energy healing",
    "about.credentials.2": "Certified Meta-Therapist and Energy Practitioner",
    "about.credentials.3": "Trained in multiple healing traditions worldwide",
    "about.credentials.4": "Hundreds of successful client transformations",
    "services.title": "Ritual Cleansing",
    "services.subtitle": "Each ritual is designed to free you from negativity and restore your soul's diamond purity",
    "services.wax.title": "Wax Cleansing",
    "services.wax.desc": "Gentle cleansing of negative energy through wax. The wax softly absorbs all negativity, returning your soul to its pristine purity.",
    "services.lead.title": "Lead Cleansing",
    "services.lead.desc": "Powerful and decisive removal of negativity through lead. Lead instantly absorbs all dark energy, freeing you once and for all.",
    "services.ritual.title": "Ritual Magic",
    "services.ritual.desc": "Deep ritual practices for transformation and protection. Ancient ceremonies adapted for the modern world.",
    "services.cta": "Book via Assistant",
    "services.note": "All bookings are handled personally through my assistant to ensure the best experience for you.",
    "footer.connect": "Connect With Me",
    "footer.contact": "Contact My Assistant",
    "footer.contact.desc": "For bookings and inquiries, reach out to my assistant who will guide you through the process.",
    "footer.rights": "All rights reserved",
    "footer.made": "Crafted with intention and purpose",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.offer": "Terms of Service",
    "footer.legal.terms": "Terms of Use",
    "footer.legal.refund": "Refund Policy",
    "legal.placeholder": "This page will be updated with full legal information soon.",
    "legal.back": "Back to Home",
  },
  ru: {
    "brand.name": "Бриллиант Души",
    "nav.about": "Обо мне",
    "nav.services": "Услуги",
    "nav.contact": "Контакт",
    "hero.subtitle": "Энергопрактик и Мета-Терапевт",
    "hero.tagline": "Раскройте скрытые измерения вашего существа через древнюю мудрость и современные энергетические практики",
    "hero.cta": "Мои Услуги",
    "about.title": "Мой Путь",
    "about.subtitle": "Путь Трансформации",
    "about.story.p1": "Мой путь в мир энергетических практик начался с глубокого личного кризиса, который разрушил всё, что я думал(а) о реальности. То, что казалось концом, стало самым мощным началом моей жизни.",
    "about.story.p2": "Годами я шёл(шла) по общепринятому пути — строил(а) карьеру, стремился(лась) к успеху в его общепринятом понимании. Но где-то глубоко внутри я чувствовал(а) настойчивый зов, шёпот чего-то более глубокого, который невозможно было игнорировать.",
    "about.story.p3": "Переломный момент наступил, когда я впервые прошёл(прошла) сеанс энергетического очищения. В тот миг слои накопленного эмоционального груза спали, и я увидел(а) проблеск той безграничной, сияющей реальности, что существует за пределами нашего повседневного восприятия.",
    "about.story.p4": "С тех пор я посвятил(а) свою жизнь овладению этими древними искусствами — обучаясь у выдающихся учителей разных традиций, углубляя понимание тонких энергетических систем, которые управляют нашим благополучием.",
    "about.story.p5": "Сегодня я веду других через их собственные трансформационные путешествия. Каждый сеанс — это священное пространство, где исцеление разворачивается естественно, где мудрость Вселенной встречается с уникальным ландшафтом вашей души.",
    "about.philosophy.title": "Моя Философия",
    "about.philosophy.text": "Я верю, что каждый человек несёт в себе чертёж собственного исцеления. Моя роль — не чинить, а освещать: помочь вам воссоединиться с бесконечным источником мудрости и силы, который всегда был вашим.",
    "about.credentials.title": "Опыт и Обучение",
    "about.credentials.1": "10+ лет посвящённой практики энергетического исцеления",
    "about.credentials.2": "Сертифицированный мета-терапевт и энергопрактик",
    "about.credentials.3": "Обучение в различных целительских традициях по всему миру",
    "about.credentials.4": "Сотни успешных клиентских трансформаций",
    "services.title": "Ритуальное Очищение",
    "services.subtitle": "Каждый ритуал создан, чтобы освободить вас от негатива и вернуть бриллиантовую чистоту вашей души",
    "services.wax.title": "Чистка воском",
    "services.wax.desc": "Мягкое и нежное очищение от негативной энергии с помощью воска. Воск бережно впитывает весь негатив, возвращая вашу душу к первозданной чистоте.",
    "services.lead.title": "Чистка свинцом",
    "services.lead.desc": "Мощное и решительное снятие негатива с помощью свинца. Свинец мгновенно забирает на себя всю тёмную энергию, освобождая вас раз и навсегда.",
    "services.ritual.title": "Ритуальная магия",
    "services.ritual.desc": "Глубокие ритуальные практики для трансформации и защиты. Древние обряды, адаптированные для современного мира.",
    "services.cta": "Записаться у ассистента",
    "services.note": "Все записи проводятся лично через моего ассистента для обеспечения лучшего опыта для вас.",
    "footer.connect": "Связаться со мной",
    "footer.contact": "Написать ассистенту",
    "footer.contact.desc": "Для записи и вопросов свяжитесь с моим ассистентом, который проведёт вас через весь процесс.",
    "footer.rights": "Все права защищены",
    "footer.made": "Создано с намерением и целью",
    "footer.legal.privacy": "Политика конфиденциальности",
    "footer.legal.offer": "Договор оферты",
    "footer.legal.terms": "Правила пользования",
    "footer.legal.refund": "Политика возврата денег",
    "legal.placeholder": "Эта страница будет обновлена полной юридической информацией в ближайшее время.",
    "legal.back": "На главную",
  },
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "ru") return saved;
    }
    return "en";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string) => translations[lang][key] || key,
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
