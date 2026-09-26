import type { Lang } from '../i18n/ui';

// Um atendimento, duas visões: cada passo aparece como bolha no chat
// e como linhas no log de execução, sincronizados.
export type DemoStep = {
  chat: { kind: 'in' | 'out' | 'tool'; text: string };
  log: string[];
};

const pt: DemoStep[] = [
  {
    chat: { kind: 'in', text: 'Oi! Vocês fazem clareamento? Quanto custa?' },
    log: [
      '23:47:02 wa-message-receiver ← +55 31 ••••-4821',
      '23:47:02 buffer.debounce 40s',
      '23:47:03 agent.loop iter=1 model=gemini-3.5-flash',
    ],
  },
  {
    chat: { kind: 'tool', text: 'rag.search → tabela de preços' },
    log: ['23:47:04 → tool rag.search("clareamento valores")'],
  },
  {
    chat: { kind: 'out', text: 'Fazemos sim! A partir de R$ 890. Quer agendar uma avaliação gratuita?' },
    log: ['23:47:05 ✓ resposta enviada · 2.8s'],
  },
  {
    chat: { kind: 'in', text: 'Quero, amanhã de manhã dá?' },
    log: ['23:47:31 agent.loop iter=2'],
  },
  {
    chat: { kind: 'tool', text: 'calendar.slots → 3 livres' },
    log: ['23:47:32 → tool calendar.slots(amanhã, manhã) · 3 livres'],
  },
  {
    chat: { kind: 'out', text: 'Tenho 09:30 ou 11:00. Qual fica melhor?' },
    log: ['23:47:33 ✓ resposta enviada · 1.9s'],
  },
  {
    chat: { kind: 'in', text: '09:30' },
    log: ['23:47:48 agent.loop iter=3'],
  },
  {
    chat: { kind: 'tool', text: 'calendar.book ✓ · funnel.move → agendado' },
    log: [
      '23:47:49 → tool calendar.book(09:30) ✓',
      '23:47:49 → tool funnel.move(lead, "agendado")',
    ],
  },
  {
    chat: { kind: 'out', text: 'Pronto, confirmado amanhã às 09:30 ✓' },
    log: ['23:47:50 ✓ agendado · sem intervenção humana'],
  },
];

const en: DemoStep[] = [
  {
    chat: { kind: 'in', text: 'Hi! Do you do teeth whitening? How much is it?' },
    log: [
      '23:47:02 wa-message-receiver ← +55 31 ••••-4821',
      '23:47:02 buffer.debounce 40s',
      '23:47:03 agent.loop iter=1 model=gemini-3.5-flash',
    ],
  },
  {
    chat: { kind: 'tool', text: 'rag.search → price list' },
    log: ['23:47:04 → tool rag.search("whitening price")'],
  },
  {
    chat: { kind: 'out', text: 'We do! Starting at R$ 890. Want to book a free assessment?' },
    log: ['23:47:05 ✓ reply sent · 2.8s'],
  },
  {
    chat: { kind: 'in', text: 'Sure, tomorrow morning?' },
    log: ['23:47:31 agent.loop iter=2'],
  },
  {
    chat: { kind: 'tool', text: 'calendar.slots → 3 open' },
    log: ['23:47:32 → tool calendar.slots(tomorrow, morning) · 3 open'],
  },
  {
    chat: { kind: 'out', text: 'I have 9:30 or 11:00. Which works best?' },
    log: ['23:47:33 ✓ reply sent · 1.9s'],
  },
  {
    chat: { kind: 'in', text: '9:30' },
    log: ['23:47:48 agent.loop iter=3'],
  },
  {
    chat: { kind: 'tool', text: 'calendar.book ✓ · funnel.move → booked' },
    log: [
      '23:47:49 → tool calendar.book(09:30) ✓',
      '23:47:49 → tool funnel.move(lead, "booked")',
    ],
  },
  {
    chat: { kind: 'out', text: 'Done, you’re booked for tomorrow at 9:30 ✓' },
    log: ['23:47:50 ✓ booked · no human involved'],
  },
];

export const agentDemo: Record<Lang, DemoStep[]> = { pt, en };
