export const languages = { pt: 'PT', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'meta.title': 'Marco Fabian · AI Engineer',
    'meta.description':
      'Agentes de IA em produção: WhatsApp, automação e integrações para negócios reais.',
  },
  en: {
    'meta.title': 'Marco Fabian · AI Engineer',
    'meta.description':
      'Production AI agents: WhatsApp, automation and integrations for real businesses.',
  },
} as const;

export type UIKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}
