import type { Lang } from '../i18n/ui';

type Group = { label: string; items: string[] };

const items = {
  ai: ['agentic loops', 'tool calling', 'rag', 'prompts versionados', 'observabilidade'],
  aiEn: ['agentic loops', 'tool calling', 'rag', 'versioned prompts', 'observability'],
  llms: ['openrouter', 'claude', 'gemini', 'gpt'],
  orchestration: ['kestra', 'n8n'],
  languages: ['python', 'typescript', 'javascript', 'sql'],
  data: ['supabase', 'postgres (rls)', 'redis', 'mysql', 'mongodb'],
  integrations: ['whatsapp cloud api', 'waha', 'uazapi', 'chatwoot', 'google apis', 'feegow', 'gestãods', 'amigo'],
  infra: ['docker', 'github actions', 'hetzner', 'jest', 'pytest'],
};

export const stack: Record<Lang, Group[]> = {
  pt: [
    { label: 'ia & agentes', items: items.ai },
    { label: 'llms', items: items.llms },
    { label: 'orquestração', items: items.orchestration },
    { label: 'linguagens', items: items.languages },
    { label: 'dados', items: items.data },
    { label: 'integrações', items: items.integrations },
    { label: 'infra & testes', items: items.infra },
  ],
  en: [
    { label: 'ai & agents', items: items.aiEn },
    { label: 'llms', items: items.llms },
    { label: 'orchestration', items: items.orchestration },
    { label: 'languages', items: items.languages },
    { label: 'data', items: items.data },
    { label: 'integrations', items: items.integrations },
    { label: 'infra & testing', items: items.infra },
  ],
};
