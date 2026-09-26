import type { Lang } from '../i18n/ui';

type Service = { title: string; body: string; tags: string[] };
type Shift = { from: string; to: string; label: string };
type Step = { title: string; body: string };

type ServicesContent = {
  featured: Service & { shifts: Shift[] };
  others: Service[];
  steps: Step[];
};

const pt: ServicesContent = {
  featured: {
    title: 'Agentes de IA no WhatsApp',
    body: 'Atendem, qualificam, agendam e fazem follow-up 24 horas por dia, e passam para o seu time na hora certa.',
    tags: ['sdr', 'agendamento', 'follow-up', 'handoff humano'],
    shifts: [
      { from: '~30 min', to: '60 s', label: 'tempo de primeira resposta' },
      { from: '100% humano', to: '90%', label: 'das conversas resolvidas pelo agente' },
      { from: 'no-show', to: '−50%', label: 'com lembretes automáticos' },
    ],
  },
  others: [
    {
      title: 'Implantação de CRM',
      body: 'Chatwoot configurado com funil, etiquetas, kanban e app instalável. A IA e o seu time na mesma timeline.',
      tags: ['chatwoot', 'funil', 'kanban'],
    },
    {
      title: 'Migração para a API oficial',
      body: 'Sua operação sai da UAZAPI ou Evolution para a Cloud API da Meta sem parar o atendimento.',
      tags: ['cloud api', 'coexistência', 'templates'],
    },
    {
      title: 'Automações e integrações',
      body: 'Agenda, CRM, ERP e planilhas conversando sozinhos, com fluxos versionados e monitorados.',
      tags: ['n8n', 'kestra', 'supabase', 'apis'],
    },
    {
      title: 'Monitoramento com IA',
      body: 'IA lendo grupos e canais e transformando mensagem solta em ticket, alerta e relatório.',
      tags: ['classificação', 'tickets', 'alertas'],
    },
  ],
  steps: [
    { title: 'Conversa', body: '30 minutos para entender sua operação e onde o atendimento perde venda.' },
    { title: 'Diagnóstico', body: 'Mapeio fluxos e integrações e fecho escopo, prazo e preço.' },
    { title: 'Construção', body: 'Entregas semanais, testadas com conversas reais antes de ir ao ar.' },
    { title: 'Operação', body: 'Monitoramento, ajustes e relatório. Eu não entrego e sumo.' },
  ],
};

const en: ServicesContent = {
  featured: {
    title: 'AI agents on WhatsApp',
    body: 'They answer, qualify, book and follow up around the clock, and hand off to your team at the right moment.',
    tags: ['sdr', 'scheduling', 'follow-up', 'human handoff'],
    shifts: [
      { from: '~30 min', to: '60 s', label: 'first response time' },
      { from: '100% human', to: '90%', label: 'of conversations solved by the agent' },
      { from: 'no-shows', to: '−50%', label: 'with automated reminders' },
    ],
  },
  others: [
    {
      title: 'CRM setup',
      body: 'Chatwoot set up with pipeline, labels, kanban and an installable app. The AI and your team on the same timeline.',
      tags: ['chatwoot', 'pipeline', 'kanban'],
    },
    {
      title: 'Migration to the official API',
      body: 'Your operation moves from UAZAPI or Evolution to Meta’s Cloud API without pausing support.',
      tags: ['cloud api', 'coexistence', 'templates'],
    },
    {
      title: 'Automations and integrations',
      body: 'Calendar, CRM, ERP and spreadsheets talking to each other, with versioned and monitored flows.',
      tags: ['n8n', 'kestra', 'supabase', 'apis'],
    },
    {
      title: 'AI monitoring',
      body: 'AI reading groups and channels and turning loose messages into tickets, alerts and reports.',
      tags: ['classification', 'tickets', 'alerts'],
    },
  ],
  steps: [
    { title: 'Call', body: '30 minutes to understand your operation and where support is losing sales.' },
    { title: 'Diagnosis', body: 'I map flows and integrations and lock scope, timeline and price.' },
    { title: 'Build', body: 'Weekly deliveries, tested with real conversations before going live.' },
    { title: 'Operation', body: 'Monitoring, tuning and reports. I don’t ship and disappear.' },
  ],
};

export const services: Record<Lang, ServicesContent> = { pt, en };
