import type { Lang } from '../i18n/ui';

// Cada linha só afirma o que os cases sustentam. `incidents` marca,
// pela posição (0–29), as barras que não foram 100% naquela janela.
export type StatusRow = {
  service: string;
  label: string;
  window: string;
  metric: string;
  incidents?: { at: number; note: string }[];
};

const pt: StatusRow[] = [
  {
    service: 'agent-platform',
    label: 'Plataforma de agentes de IA (Kestra)',
    window: '90 dias',
    metric: '3 meses sem cair',
  },
  {
    service: 'wa-message-receiver',
    label: 'Receptor de mensagens WhatsApp',
    window: '7 dias',
    metric: '29.062 execuções · 100%',
  },
  {
    service: 'sanii-ticketing',
    label: 'Central de tickets com IA (Sanii)',
    window: '90 dias',
    metric: '~99 grupos monitorados',
    incidents: [{ at: 11, note: 'Sistema externo removido sem aviso · recuperado no mesmo dia' }],
  },
];

const en: StatusRow[] = [
  {
    service: 'agent-platform',
    label: 'AI agent platform (Kestra)',
    window: '90 days',
    metric: '3 months, zero downtime',
  },
  {
    service: 'wa-message-receiver',
    label: 'WhatsApp message receiver',
    window: '7 days',
    metric: '29,062 runs · 100%',
  },
  {
    service: 'sanii-ticketing',
    label: 'AI ticketing hub (Sanii)',
    window: '90 days',
    metric: '~99 groups monitored',
    incidents: [{ at: 11, note: 'External system removed without notice · recovered same day' }],
  },
];

export const statusRows: Record<Lang, StatusRow[]> = { pt, en };
