export const languages = { pt: 'PT', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'meta.title': 'Marco Fabian · AI Engineer',
    'meta.description':
      'Agentes de IA em produção: WhatsApp, automação e integrações para negócios reais.',
    'nav.cases': 'Cases',
    'nav.services': 'Serviços',
    'nav.about': 'Sobre',
    'nav.cta': 'Falar comigo',
    'hero.status': 'Disponível para projetos',
    'hero.eyebrow': '~/ai-engineer',
    'hero.title': 'Eu construo agentes de IA que rodam em produção, não demos.',
    'hero.subtitle':
      'Agentes no WhatsApp que atendem, qualificam e agendam para mais de 40 negócios.',
    'hero.ctaPrimary': 'Ver cases',
    'hero.ctaSecondary': 'Falar comigo',
    'demo.toInside': 'ver por dentro →',
    'demo.toChat': '← ver conversa',
    'demo.chatLabel': 'WhatsApp · agente de IA',
    'demo.logLabel': 'execução do agente',
  },
  en: {
    'meta.title': 'Marco Fabian · AI Engineer',
    'meta.description':
      'Production AI agents: WhatsApp, automation and integrations for real businesses.',
    'nav.cases': 'Cases',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.cta': 'Get in touch',
    'hero.status': 'Available for projects',
    'hero.eyebrow': '~/ai-engineer',
    'hero.title': 'I build AI agents that run in production, not demos.',
    'hero.subtitle':
      'WhatsApp agents that answer, qualify and book appointments for 40+ businesses.',
    'hero.ctaPrimary': 'See cases',
    'hero.ctaSecondary': 'Get in touch',
    'demo.toInside': 'look inside →',
    'demo.toChat': '← back to chat',
    'demo.chatLabel': 'WhatsApp · AI agent',
    'demo.logLabel': 'agent execution',
  },
} as const;

export type UIKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function localePath(lang: Lang, path = '/') {
  return lang === defaultLang ? path : `/${lang}${path === '/' ? '' : path}`;
}
