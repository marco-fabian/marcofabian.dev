import type { Lang } from '../i18n/ui';

export type CaseSummary = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  metric: string;
  highlights?: string[];
};

const pt: CaseSummary[] = [
  {
    slug: 'kestra',
    title: 'Plataforma multi-tenant de agentes de IA no WhatsApp',
    summary:
      'Agentes que atendem, qualificam e agendam para mais de 40 negócios. Migrei de n8n para uma arquitetura code-first em Kestra, com agentic loop próprio e deploy via GitOps.',
    stack: ['kestra', 'python', 'supabase', 'whatsapp', 'openrouter'],
    metric: '15 mil msgs/dia',
    highlights: ['40+ negócios', '90% sem humano', '3 meses sem cair'],
  },
  {
    slug: 'sanii',
    title: 'Central de tickets com IA · Sanii',
    summary: 'IA lê ~140 grupos de WhatsApp e transforma faltas e reclamações em tickets.',
    stack: ['n8n', 'gemini', 'airtable'],
    metric: '~99 grupos',
  },
  {
    slug: 'meta-cloud-api',
    title: 'Migração para a API oficial do WhatsApp',
    summary: 'Agentes em produção saindo de APIs não oficiais para a Cloud API da Meta.',
    stack: ['graph api', 'cloud api v25', 'n8n'],
    metric: 'runbook reutilizável',
  },
  {
    slug: 'agencia-viagens',
    title: 'SDR com IA para agência de viagens',
    summary: 'Qualifica leads de passagens internacionais e entrega o atendimento pronto ao vendedor.',
    stack: ['n8n', 'supabase', 'redis'],
    metric: 'cloud api oficial',
  },
];

const en: CaseSummary[] = [
  {
    slug: 'kestra',
    title: 'Multi-tenant AI agent platform on WhatsApp',
    summary:
      'Agents that answer, qualify and book for 40+ businesses. Migrated from n8n to a code-first Kestra architecture with a custom agentic loop and GitOps deploys.',
    stack: ['kestra', 'python', 'supabase', 'whatsapp', 'openrouter'],
    metric: '15k msgs/day',
    highlights: ['40+ businesses', '90% without humans', '3 months, zero downtime'],
  },
  {
    slug: 'sanii',
    title: 'AI ticketing hub · Sanii',
    summary: 'AI reads ~140 WhatsApp groups and turns absences and complaints into tickets.',
    stack: ['n8n', 'gemini', 'airtable'],
    metric: '~99 groups',
  },
  {
    slug: 'meta-cloud-api',
    title: 'Migration to the official WhatsApp API',
    summary: 'Production agents moved from unofficial APIs to Meta’s Cloud API.',
    stack: ['graph api', 'cloud api v25', 'n8n'],
    metric: 'reusable runbook',
  },
  {
    slug: 'agencia-viagens',
    title: 'AI SDR for a travel agency',
    summary: 'Qualifies international flight leads and hands a ready brief to the sales rep.',
    stack: ['n8n', 'supabase', 'redis'],
    metric: 'official cloud api',
  },
];

export const cases: Record<Lang, CaseSummary[]> = { pt, en };
