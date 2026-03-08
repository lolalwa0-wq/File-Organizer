import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type Language = "en" | "ru";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
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
    "services.title": "Sacred Services",
    "services.subtitle": "Each offering is crafted to meet you exactly where you are on your journey",
    "services.energy.title": "Energy Cleansing",
    "services.energy.desc": "A deep purification of your energy field, releasing blockages, attachments, and stagnant patterns that no longer serve your highest good. This session restores flow, clarity, and vitality to every layer of your being.",
    "services.energy.duration": "Duration: 60-90 minutes",
    "services.energy.format": "Format: Online or In-Person",
    "services.energy.price": "$150",
    "services.therapy.title": "Meta-Therapy",
    "services.therapy.desc": "A transformative therapeutic approach that works beyond the physical plane. Meta-Therapy addresses the root causes of emotional, mental, and spiritual imbalances by accessing deeper dimensions of consciousness.",
    "services.therapy.duration": "Duration: 90-120 minutes",
    "services.therapy.format": "Format: Online or In-Person",
    "services.therapy.price": "$200",
    "services.session.title": "Meta-Session",
    "services.session.desc": "An intensive, personalized journey into the deepest layers of your being. This comprehensive session combines multiple modalities to create a powerful, integrated healing experience tailored uniquely to you.",
    "services.session.duration": "Duration: 2-3 hours",
    "services.session.format": "Format: Online or In-Person",
    "services.session.price": "$350",
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
    "services.title": "Священные Услуги",
    "services.subtitle": "Каждое предложение создано, чтобы встретить вас именно там, где вы находитесь на вашем пути",
    "services.energy.title": "Энергетическое Очищение",
    "services.energy.desc": "Глубокое очищение вашего энергетического поля, высвобождение блоков, привязок и застоявшихся паттернов, которые больше не служат вашему высшему благу. Этот сеанс восстанавливает поток, ясность и жизненную силу на каждом уровне вашего существа.",
    "services.energy.duration": "Продолжительность: 60-90 минут",
    "services.energy.format": "Формат: Онлайн или Лично",
    "services.energy.price": "$150",
    "services.therapy.title": "Мета-Терапия",
    "services.therapy.desc": "Трансформационный терапевтический подход, работающий за пределами физического плана. Мета-Терапия обращается к коренным причинам эмоциональных, ментальных и духовных дисбалансов, обращаясь к более глубоким измерениям сознания.",
    "services.therapy.duration": "Продолжительность: 90-120 минут",
    "services.therapy.format": "Формат: Онлайн или Лично",
    "services.therapy.price": "$200",
    "services.session.title": "Мета-Сессия",
    "services.session.desc": "Интенсивное, персонализированное путешествие в глубочайшие слои вашего существа. Этот комплексный сеанс объединяет множество модальностей для создания мощного, интегрированного целительного опыта, уникально адаптированного именно для вас.",
    "services.session.duration": "Продолжительность: 2-3 часа",
    "services.session.format": "Формат: Онлайн или Лично",
    "services.session.price": "$350",
    "services.cta": "Записаться через ассистента",
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
