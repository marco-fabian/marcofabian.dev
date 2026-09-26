import type { Lang } from '../i18n/ui';

// Um atendimento, duas visões: cada passo aparece como bolha no chat
// e como linhas no log de execução, sincronizados.
export type DemoStep = {
  chat: { kind: 'in' | 'out' | 'tool'; text: string };
  log: string[];
};

export type DemoScenario = {
  id: 'clinic' | 'travel';
  label: string;
  conversations: DemoStep[][];
};

// Atalho para escrever roteiros: tipo da bolha, texto e as linhas de log daquele passo
const m = (kind: DemoStep['chat']['kind'], text: string, ...log: string[]): DemoStep => ({ chat: { kind, text }, log });

const pt: DemoScenario[] = [
  {
    id: 'clinic',
    label: 'Clínica',
    conversations: [
      [
        {
          chat: { kind: 'in', text: 'Boa noite! Queria marcar consulta com cardiologista. Vocês aceitam Unimed?' },
          log: ['23:47:02 wa-message-receiver ← +55 31 ••••-4821', '23:47:03 agent.loop iter=1'],
        },
        { chat: { kind: 'tool', text: 'rag.search → convênios aceitos' }, log: ['23:47:04 → tool rag.search("convênios")'] },
        { chat: { kind: 'out', text: 'Aceitamos sim! Qual dia fica melhor pra você?' }, log: ['23:47:05 ✓ resposta enviada · 2.6s'] },
        { chat: { kind: 'in', text: 'Quinta à tarde' }, log: ['23:47:21 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'calendar.slots → cardiologia · 2 livres' },
          log: ['23:47:22 → tool calendar.slots(quinta, tarde) · 2 livres'],
        },
        { chat: { kind: 'out', text: 'Quinta tenho 14:00 ou 16:30. Qual prefere?' }, log: ['23:47:23 ✓ resposta enviada · 1.8s'] },
        { chat: { kind: 'in', text: '16:30' }, log: ['23:47:35 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'calendar.book ✓ · reminder → véspera' },
          log: ['23:47:36 → tool calendar.book(16:30) ✓', '23:47:36 → tool reminder.schedule(-24h)'],
        },
        {
          chat: { kind: 'out', text: 'Agendado para quinta às 16:30! Te mando um lembrete na véspera ✓' },
          log: ['23:47:37 ✓ agendado · sem intervenção humana'],
        },
      ],
      [
        {
          chat: { kind: 'in', text: 'Oi, preciso remarcar minha consulta de amanhã, surgiu um imprevisto' },
          log: ['07:12:40 wa-message-receiver ← +55 31 ••••-1907', '07:12:41 agent.loop iter=1'],
        },
        {
          chat: { kind: 'tool', text: 'patient.lookup → amanhã 10:00 · dermatologia' },
          log: ['07:12:41 → tool patient.lookup(phone) · 1 consulta'],
        },
        {
          chat: { kind: 'out', text: 'Sem problema! Achei sua consulta amanhã às 10:00. Quer ver horários na semana que vem?' },
          log: ['07:12:43 ✓ resposta enviada · 2.4s'],
        },
        { chat: { kind: 'in', text: 'Quero, de manhã' }, log: ['07:13:02 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'calendar.slots → 3 livres' },
          log: ['07:13:03 → tool calendar.slots(próx. semana, manhã) · 3 livres'],
        },
        { chat: { kind: 'out', text: 'Tenho segunda 9:00, terça 8:30 ou quarta 11:00.' }, log: ['07:13:04 ✓ resposta enviada · 1.7s'] },
        { chat: { kind: 'in', text: 'Terça' }, log: ['07:13:15 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'calendar.reschedule ✓ · horário antigo liberado' },
          log: ['07:13:16 → tool calendar.reschedule(ter 08:30) ✓', '07:13:16 → slot seg 10:00 liberado'],
        },
        { chat: { kind: 'out', text: 'Pronto! Remarquei para terça às 8:30 ✓' }, log: ['07:13:17 ✓ remarcado · sem intervenção humana'] },
      ],
      [
        {
          chat: { kind: 'in', text: 'Qual o preparo pro exame de sangue? E posso tomar meu remédio de pressão antes?' },
          log: ['19:05:11 wa-message-receiver ← +55 31 ••••-3356', '19:05:12 agent.loop iter=1'],
        },
        {
          chat: { kind: 'tool', text: 'rag.search → preparo de exames' },
          log: ['19:05:13 → tool rag.search("preparo exame de sangue")'],
        },
        {
          chat: { kind: 'out', text: 'São 8 horas de jejum, água liberada. Sobre o remédio, vou confirmar com a enfermagem, tá?' },
          log: ['19:05:14 ✓ resposta enviada · 2.9s', '19:05:14 guardrail: dúvida clínica → humano'],
        },
        {
          chat: { kind: 'tool', text: 'handoff → enfermagem · prioridade alta' },
          log: ['19:05:15 → tool handoff(enfermagem, prioridade=alta)', '19:05:15 ia pausada nesta conversa'],
        },
        {
          chat: { kind: 'out', text: 'Já passei sua pergunta pra enfermagem. Eles te respondem por aqui em instantes ✓' },
          log: ['19:05:16 ✓ handoff concluído'],
        },
        { chat: { kind: 'in', text: 'Obrigada!' }, log: ['19:05:30 mensagem → equipe (ia pausada)'] },
      ],
      [
        m('in', 'Quanto custa a consulta particular com dermatologista?', '13:22:08 wa-message-receiver ← +55 31 ••••-6620', '13:22:09 agent.loop iter=1'),
        m('tool', 'rag.search → tabela de valores', '13:22:10 → tool rag.search("valor consulta dermatologia")'),
        m('out', 'A consulta particular é R$ 350. Quer que eu veja um horário pra você?', '13:22:11 ✓ resposta enviada · 2.5s'),
        m('in', 'Quero, mas só consigo depois das 18h', '13:22:40 agent.loop iter=2'),
        m('tool', 'calendar.slots → após 18h · 2 livres', '13:22:41 → tool calendar.slots(após 18:00) · 2 livres'),
        m('out', 'Tenho terça 18:30 ou quinta 19:00.', '13:22:42 ✓ resposta enviada · 1.9s'),
        m('in', 'Quinta', '13:22:55 agent.loop iter=3'),
        m('tool', 'calendar.book ✓ · funnel.move → agendado', '13:22:56 → tool calendar.book(qui 19:00) ✓', '13:22:56 → tool funnel.move(lead, "agendado")'),
        m('out', 'Agendado para quinta às 19:00! Te mando o endereço e um lembrete na véspera ✓', '13:22:57 ✓ novo paciente agendado'),
      ],
      [
        m('tool', 'lembrete · consulta amanhã 9:00', '18:00:00 reminder.run → 14 consultas amanhã', '18:00:01 horário comercial ok'),
        m('out', 'Oi! Passando pra lembrar da sua consulta amanhã às 9:00 com a ortopedia. Você confirma?', '18:00:02 ✓ lembrete enviado'),
        m('in', 'Não vou conseguir, dá pra mudar pra sexta?', '18:07:31 agent.loop iter=1'),
        m('tool', 'calendar.slots → sexta · 2 livres', '18:07:32 → tool calendar.slots(sex) · 2 livres'),
        m('out', 'Claro! Sexta tenho 10:00 ou 15:00.', '18:07:33 ✓ resposta enviada · 1.8s'),
        m('in', '15:00', '18:07:48 agent.loop iter=2'),
        m('tool', 'calendar.reschedule ✓ · horário de amanhã liberado', '18:07:49 → tool calendar.reschedule(sex 15:00) ✓', '18:07:49 → slot amanhã 09:00 liberado p/ encaixe'),
        m('out', 'Feito! Te espero sexta às 15:00 ✓', '18:07:50 ✓ no-show evitado'),
      ],
      [
        m('in', 'Tô com dor de ouvido faz 3 dias. Tem otorrino amanhã cedo?', '02:14:07 wa-message-receiver ← +55 31 ••••-4418', '02:14:08 agent.loop iter=1 · fora do horário'),
        m('tool', 'calendar.slots → amanhã manhã · 1 livre', '02:14:09 → tool calendar.slots(amanhã, manhã) · 1 livre'),
        m('out', 'Tenho amanhã às 8:00 com o otorrino. Posso reservar? Se a dor piorar muito, procure um pronto-socorro.', '02:14:10 ✓ resposta enviada · 2.7s', '02:14:10 guardrail: orientação de urgência incluída'),
        m('in', 'Pode reservar sim', '02:14:31 agent.loop iter=2'),
        m('tool', 'calendar.book ✓', '02:14:32 → tool calendar.book(08:00) ✓'),
        m('out', 'Reservado! Amanhã às 8:00. Melhoras ✓', '02:14:33 ✓ agendado de madrugada · sem intervenção humana'),
      ],
      [
        m('tool', 'follow-up · retorno de 30 dias', '10:00:00 followup.claim → 6 retornos elegíveis', '10:00:00 horário comercial ok'),
        m('out', 'Oi! Já faz 30 dias da sua consulta com a endocrinologia e o médico pediu retorno. Quer agendar?', '10:00:02 ✓ follow-up enviado'),
        m('in', 'Quero sim! Pode ser segunda?', '10:14:19 agent.loop iter=1'),
        m('tool', 'calendar.slots → segunda · 3 livres', '10:14:20 → tool calendar.slots(seg) · 3 livres'),
        m('out', 'Segunda tenho 8:30, 11:00 ou 16:00.', '10:14:21 ✓ resposta enviada · 1.6s'),
        m('in', '11:00', '10:14:33 agent.loop iter=2'),
        m('tool', 'calendar.book ✓ · funnel.move → retorno agendado', '10:14:34 → tool calendar.book(seg 11:00) ✓', '10:14:34 → tool funnel.move(paciente, "retorno")'),
        m('out', 'Agendado! Segunda às 11:00 ✓', '10:14:35 ✓ retorno recuperado pelo follow-up'),
      ],
      [
        m('in', 'Preciso do recibo da consulta de ontem pra pedir reembolso do convênio', '15:40:12 wa-message-receiver ← +55 31 ••••-8093', '15:40:13 agent.loop iter=1'),
        m('tool', 'patient.lookup → consulta ontem · clínica geral', '15:40:13 → tool patient.lookup(phone) · 1 consulta'),
        m('out', 'Achei sua consulta de ontem. Quem emite o recibo é a recepção, vou te passar pra eles, tá?', '15:40:15 ✓ resposta enviada · 2.2s'),
        m('tool', 'handoff → recepção · resumo enviado', '15:40:15 → tool handoff(recepção, resumo)', '15:40:15 ia pausada nesta conversa'),
        m('out', 'Pronto! A recepção já sabe o que você precisa e te responde por aqui ✓', '15:40:16 ✓ handoff concluído'),
        m('in', 'Perfeito, obrigado', '15:40:29 mensagem → equipe (ia pausada)'),
      ],
    ],
  },
  {
    id: 'travel',
    label: 'Viagens',
    conversations: [
      [
        {
          chat: { kind: 'in', text: 'Oi! Quanto tá uma passagem pra Lisboa em março?' },
          log: ['21:30:05 wa-message-receiver ← +55 31 ••••-7710', '21:30:06 agent.loop iter=1'],
        },
        {
          chat: { kind: 'out', text: 'Oi! Vou montar sua cotação. Sai de qual cidade e são quantas pessoas?' },
          log: ['21:30:08 ✓ resposta enviada · 2.3s'],
        },
        { chat: { kind: 'in', text: 'BH, 2 adultos' }, log: ['21:30:24 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'flights.search(CNF → LIS) → 3 opções · card enviado' },
          log: ['21:30:25 → tool flights.search(CNF→LIS, mar, 2) · 3 opções', '21:30:27 → tool send_media(card)'],
        },
        {
          chat: { kind: 'out', text: 'Achei a partir de R$ 4.380 por pessoa, ida e volta. Te mandei as opções 👆' },
          log: ['21:30:28 ✓ resposta enviada · 3.9s'],
        },
        { chat: { kind: 'in', text: 'Quero a mais barata' }, log: ['21:30:41 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → qualificado · handoff → consultora' },
          log: ['21:30:42 → tool funnel.move(lead, "qualificado")', '21:30:42 → tool handoff(consultora, resumo)'],
        },
        {
          chat: { kind: 'out', text: 'Perfeito! Já passei pra nossa consultora finalizar sua reserva ✓' },
          log: ['21:30:43 ✓ lead qualificado · resumo enviado ao time'],
        },
      ],
      [
        {
          chat: { kind: 'in', text: 'Vocês têm pacote pra Cancún em julho? Somos um casal' },
          log: ['12:18:33 wa-message-receiver ← +55 31 ••••-2245', '12:18:34 agent.loop iter=1'],
        },
        {
          chat: { kind: 'out', text: 'Temos sim! Vocês preferem all inclusive ou só aéreo + hotel?' },
          log: ['12:18:35 ✓ resposta enviada · 2.1s'],
        },
        { chat: { kind: 'in', text: 'All inclusive' }, log: ['12:18:49 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'rag.search → pacotes Cancún · 3 hotéis enviados' },
          log: ['12:18:50 → tool rag.search("cancún julho all inclusive")', '12:18:51 → tool send_media(3 hotéis)'],
        },
        {
          chat: { kind: 'out', text: 'Tenho 7 noites all inclusive a partir de R$ 9.900 por pessoa. Te mandei os hotéis 👆' },
          log: ['12:18:52 ✓ resposta enviada · 3.2s'],
        },
        { chat: { kind: 'in', text: 'Gostei do segundo!' }, log: ['12:19:10 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → proposta · handoff → consultora' },
          log: ['12:19:11 → tool funnel.move(lead, "proposta")', '12:19:11 → tool handoff(consultora, resumo)'],
        },
        {
          chat: { kind: 'out', text: 'Ótima escolha! Nossa consultora já vai te mandar a proposta ✓' },
          log: ['12:19:12 ✓ proposta encaminhada ao time'],
        },
      ],
      [
        {
          chat: { kind: 'tool', text: 'follow-up · lead sem resposta há 60 min' },
          log: ['16:02:00 followup.claim → 1 lead elegível', '16:02:00 janela 24h ok · horário comercial ok'],
        },
        {
          chat: { kind: 'out', text: 'Oi! Você pediu cotação pra Santiago há pouco. Ainda tem interesse? As tarifas de agosto estão subindo' },
          log: ['16:02:02 ✓ follow-up 3/3 enviado'],
        },
        { chat: { kind: 'in', text: 'Tenho sim! Mas queria saindo de SP' }, log: ['16:04:47 agent.loop iter=1'] },
        {
          chat: { kind: 'tool', text: 'flights.search(GRU → SCL) → 4 opções' },
          log: ['16:04:48 → tool flights.search(GRU→SCL, ago) · 4 opções'],
        },
        {
          chat: { kind: 'out', text: 'De São Paulo sai por R$ 1.890 ida e volta. Quer que eu reserve essa tarifa?' },
          log: ['16:04:50 ✓ resposta enviada · 3.1s'],
        },
        { chat: { kind: 'in', text: 'Quero!' }, log: ['16:05:02 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → fechamento · handoff → consultora' },
          log: ['16:05:03 → tool funnel.move(lead, "fechamento")', '16:05:03 → tool handoff(consultora, resumo)'],
        },
        {
          chat: { kind: 'out', text: 'Combinado! Nossa consultora já está cuidando da sua reserva ✓' },
          log: ['16:05:04 ✓ lead recuperado pelo follow-up'],
        },
      ],
      [
        m('in', '¡Hola! ¿Cuánto cuesta un paquete a Río para 4 personas en enero?', '11:03:41 wa-message-receiver ← +54 11 ••••-5530', '11:03:42 agent.loop iter=1 · idioma=es'),
        m('out', '¡Hola! Con gusto te ayudo. ¿Desde qué ciudad salen?', '11:03:43 ✓ resposta enviada (es) · 2.0s'),
        m('in', 'Buenos Aires', '11:03:58 agent.loop iter=2'),
        m('tool', 'packages.search(EZE → GIG) → 3 opções', '11:03:59 → tool packages.search(EZE→GIG, jan, 4) · 3 opções', '11:04:01 → tool send_media(card)'),
        m('out', 'Tengo 5 noches en Copacabana desde US$ 890 por persona. Te envié las opciones 👆', '11:04:02 ✓ resposta enviada (es) · 3.6s'),
        m('in', 'Perfecto, ¿cómo reservamos?', '11:04:20 agent.loop iter=3'),
        m('tool', 'funnel.move → qualificado · handoff → consultora', '11:04:21 → tool funnel.move(lead, "qualificado")', '11:04:21 → tool handoff(consultora, resumo, idioma=es)'),
        m('out', '¡Genial! Nuestra consultora te escribe ahora para cerrar la reserva ✓', '11:04:22 ✓ lead em espanhol qualificado'),
      ],
      [
        m('in', '🎤 Áudio · 0:14', '09:41:17 wa-message-receiver ← +55 21 ••••-3184 · audio/ogg'),
        m('tool', 'whisper → "queria ir pra Roma em maio com a minha mãe"', '09:41:18 → tool whisper.transcribe(14s) ✓', '09:41:19 agent.loop iter=1'),
        m('out', 'Que viagem boa! Vocês saem de qual cidade?', '09:41:20 ✓ resposta enviada · 2.9s'),
        m('in', 'Do Rio', '09:41:36 agent.loop iter=2'),
        m('tool', 'flights.search(GIG → FCO) → 4 opções · card enviado', '09:41:37 → tool flights.search(GIG→FCO, mai, 2) · 4 opções', '09:41:39 → tool send_media(card)'),
        m('out', 'Achei a partir de R$ 5.120 por pessoa, ida e volta. Te mandei as opções 👆', '09:41:40 ✓ resposta enviada · 3.8s'),
        m('in', 'Fechado, pode seguir', '09:42:02 agent.loop iter=3'),
        m('tool', 'handoff → consultora · resumo enviado', '09:42:03 → tool handoff(consultora, resumo)'),
        m('out', 'Maravilha! Nossa consultora já vai emitir pra vocês ✓', '09:42:04 ✓ lead qualificado a partir de áudio'),
      ],
      [
        m('in', '📷 Imagem', '20:15:50 wa-message-receiver ← +55 31 ••••-9951 · image/jpeg'),
        m('tool', 'vision → anúncio "Maldivas · 7 noites"', '20:15:51 → tool vision.describe(imagem) ✓', '20:15:52 agent.loop iter=1'),
        m('out', 'Vi que você se interessou pelas Maldivas! Pra quando seria a viagem?', '20:15:53 ✓ resposta enviada · 3.0s'),
        m('in', 'Lua de mel, em novembro', '20:16:12 agent.loop iter=2'),
        m('tool', 'rag.search → pacotes lua de mel · 2 opções', '20:16:13 → tool rag.search("maldivas lua de mel novembro")', '20:16:14 → tool send_media(2 pacotes)'),
        m('out', 'Parabéns! Tenho 7 noites a partir de R$ 18.500 por pessoa. Te mandei os pacotes 👆', '20:16:15 ✓ resposta enviada · 3.1s'),
        m('in', 'Amei o primeiro', '20:16:40 agent.loop iter=3'),
        m('tool', 'funnel.move → proposta · handoff → consultora', '20:16:41 → tool funnel.move(lead, "proposta")', '20:16:41 → tool handoff(consultora, resumo)'),
        m('out', 'Ótima escolha! Nossa consultora te chama pra fechar os detalhes ✓', '20:16:42 ✓ lead qualificado a partir de imagem'),
      ],
      [
        m('tool', 'follow-up · lead sem resposta há 30 min', '14:31:00 followup.claim → 1 lead elegível', '14:31:00 janela 24h ok · horário comercial ok'),
        m('out', 'Oi! Conseguiu ver a cotação pra Buenos Aires?', '14:31:01 ✓ follow-up 2/3 enviado'),
        m('in', 'Vi, mas achei caro', '14:33:26 agent.loop iter=1'),
        m('tool', 'flights.search(datas flexíveis) → junho mais barato', '14:33:27 → tool flights.search(GRU→EZE, flex) · 5 datas'),
        m('out', 'Entendo! Em junho a mesma viagem sai por R$ 1.320, cerca de 30% a menos. Quer ver?', '14:33:29 ✓ resposta enviada · 3.3s'),
        m('in', 'Agora sim, quero', '14:33:51 agent.loop iter=2'),
        m('tool', 'funnel.move → qualificado · handoff → consultora', '14:33:52 → tool funnel.move(lead, "qualificado")', '14:33:52 → tool handoff(consultora, resumo)'),
        m('out', 'Combinado! Nossa consultora já te manda as opções de junho ✓', '14:33:53 ✓ objeção de preço contornada'),
      ],
      [
        m('in', 'Preciso mudar o nome numa passagem que comprei com vocês', '17:48:03 wa-message-receiver ← +55 31 ••••-2767', '17:48:04 agent.loop iter=1'),
        m('tool', 'rag.search → política de alteração', '17:48:05 → tool rag.search("alteração de nome passagem")'),
        m('out', 'Alteração de nome depende da companhia aérea. Vou passar pra nossa equipe verificar, tá?', '17:48:06 ✓ resposta enviada · 2.6s'),
        m('tool', 'handoff → consultora · ia pausada', '17:48:06 → tool handoff(consultora, resumo)', '17:48:06 label ia-inativa · pausa 5 min'),
        m('out', 'Pronto! Nossa consultora já está com a sua reserva e te responde por aqui ✓', '17:48:07 ✓ humano assumiu a conversa'),
        m('in', 'Beleza, aguardo', '17:48:20 mensagem → equipe (ia pausada)'),
      ],
    ],
  },
];

const en: DemoScenario[] = [
  {
    id: 'clinic',
    label: 'Clinic',
    conversations: [
      [
        {
          chat: { kind: 'in', text: 'Hi! I’d like to book a cardiologist. Do you take my health plan?' },
          log: ['23:47:02 wa-message-receiver ← +55 31 ••••-4821', '23:47:03 agent.loop iter=1'],
        },
        { chat: { kind: 'tool', text: 'rag.search → accepted plans' }, log: ['23:47:04 → tool rag.search("health plans")'] },
        { chat: { kind: 'out', text: 'We do! Which day works best for you?' }, log: ['23:47:05 ✓ reply sent · 2.6s'] },
        { chat: { kind: 'in', text: 'Thursday afternoon' }, log: ['23:47:21 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'calendar.slots → cardiology · 2 open' },
          log: ['23:47:22 → tool calendar.slots(thu, afternoon) · 2 open'],
        },
        { chat: { kind: 'out', text: 'On Thursday I have 2:00 or 4:30 pm. Which one?' }, log: ['23:47:23 ✓ reply sent · 1.8s'] },
        { chat: { kind: 'in', text: '4:30' }, log: ['23:47:35 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'calendar.book ✓ · reminder → day before' },
          log: ['23:47:36 → tool calendar.book(16:30) ✓', '23:47:36 → tool reminder.schedule(-24h)'],
        },
        {
          chat: { kind: 'out', text: 'Booked for Thursday at 4:30 pm! I’ll send you a reminder the day before ✓' },
          log: ['23:47:37 ✓ booked · no human involved'],
        },
      ],
      [
        {
          chat: { kind: 'in', text: 'Hi, I need to reschedule tomorrow’s appointment, something came up' },
          log: ['07:12:40 wa-message-receiver ← +55 31 ••••-1907', '07:12:41 agent.loop iter=1'],
        },
        {
          chat: { kind: 'tool', text: 'patient.lookup → tomorrow 10:00 · dermatology' },
          log: ['07:12:41 → tool patient.lookup(phone) · 1 appointment'],
        },
        {
          chat: { kind: 'out', text: 'No problem! I found your appointment tomorrow at 10:00. Want to see times next week?' },
          log: ['07:12:43 ✓ reply sent · 2.4s'],
        },
        { chat: { kind: 'in', text: 'Yes, mornings' }, log: ['07:13:02 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'calendar.slots → 3 open' },
          log: ['07:13:03 → tool calendar.slots(next week, morning) · 3 open'],
        },
        { chat: { kind: 'out', text: 'I have Monday 9:00, Tuesday 8:30 or Wednesday 11:00.' }, log: ['07:13:04 ✓ reply sent · 1.7s'] },
        { chat: { kind: 'in', text: 'Tuesday' }, log: ['07:13:15 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'calendar.reschedule ✓ · old slot released' },
          log: ['07:13:16 → tool calendar.reschedule(tue 08:30) ✓', '07:13:16 → slot mon 10:00 released'],
        },
        { chat: { kind: 'out', text: 'Done! Moved to Tuesday at 8:30 ✓' }, log: ['07:13:17 ✓ rescheduled · no human involved'] },
      ],
      [
        {
          chat: { kind: 'in', text: 'How do I prepare for the blood test? Can I take my blood pressure pill before?' },
          log: ['19:05:11 wa-message-receiver ← +55 31 ••••-3356', '19:05:12 agent.loop iter=1'],
        },
        {
          chat: { kind: 'tool', text: 'rag.search → exam preparation' },
          log: ['19:05:13 → tool rag.search("blood test preparation")'],
        },
        {
          chat: { kind: 'out', text: 'It’s an 8-hour fast, water is fine. About the pill, let me check with our nursing team, ok?' },
          log: ['19:05:14 ✓ reply sent · 2.9s', '19:05:14 guardrail: clinical question → human'],
        },
        {
          chat: { kind: 'tool', text: 'handoff → nursing · high priority' },
          log: ['19:05:15 → tool handoff(nursing, priority=high)', '19:05:15 ai paused for this conversation'],
        },
        {
          chat: { kind: 'out', text: 'I’ve passed your question to nursing. They’ll reply here shortly ✓' },
          log: ['19:05:16 ✓ handoff complete'],
        },
        { chat: { kind: 'in', text: 'Thank you!' }, log: ['19:05:30 message → team (ai paused)'] },
      ],
      [
        m('in', 'How much is a private dermatology appointment?', '13:22:08 wa-message-receiver ← +55 31 ••••-6620', '13:22:09 agent.loop iter=1'),
        m('tool', 'rag.search → price list', '13:22:10 → tool rag.search("dermatology appointment price")'),
        m('out', 'A private appointment is R$ 350. Want me to find a time for you?', '13:22:11 ✓ reply sent · 2.5s'),
        m('in', 'Yes, but I can only do after 6 pm', '13:22:40 agent.loop iter=2'),
        m('tool', 'calendar.slots → after 6 pm · 2 open', '13:22:41 → tool calendar.slots(after 18:00) · 2 open'),
        m('out', 'I have Tuesday 6:30 pm or Thursday 7:00 pm.', '13:22:42 ✓ reply sent · 1.9s'),
        m('in', 'Thursday', '13:22:55 agent.loop iter=3'),
        m('tool', 'calendar.book ✓ · funnel.move → booked', '13:22:56 → tool calendar.book(thu 19:00) ✓', '13:22:56 → tool funnel.move(lead, "booked")'),
        m('out', 'Booked for Thursday at 7:00 pm! I’ll send the address and a reminder the day before ✓', '13:22:57 ✓ new patient booked'),
      ],
      [
        m('tool', 'reminder · appointment tomorrow 9:00', '18:00:00 reminder.run → 14 appointments tomorrow', '18:00:01 business hours ok'),
        m('out', 'Hi! Just a reminder of your orthopedics appointment tomorrow at 9:00. Can you confirm?', '18:00:02 ✓ reminder sent'),
        m('in', 'I can’t make it, can we move it to Friday?', '18:07:31 agent.loop iter=1'),
        m('tool', 'calendar.slots → Friday · 2 open', '18:07:32 → tool calendar.slots(fri) · 2 open'),
        m('out', 'Sure! On Friday I have 10:00 or 3:00 pm.', '18:07:33 ✓ reply sent · 1.8s'),
        m('in', '3 pm', '18:07:48 agent.loop iter=2'),
        m('tool', 'calendar.reschedule ✓ · tomorrow’s slot released', '18:07:49 → tool calendar.reschedule(fri 15:00) ✓', '18:07:49 → slot tomorrow 09:00 released'),
        m('out', 'Done! See you Friday at 3:00 pm ✓', '18:07:50 ✓ no-show avoided'),
      ],
      [
        m('in', 'My ear has been hurting for 3 days. Any ENT early tomorrow?', '02:14:07 wa-message-receiver ← +55 31 ••••-4418', '02:14:08 agent.loop iter=1 · after hours'),
        m('tool', 'calendar.slots → tomorrow morning · 1 open', '02:14:09 → tool calendar.slots(tomorrow, morning) · 1 open'),
        m('out', 'I have tomorrow at 8:00 with the ENT. Shall I book it? If the pain gets much worse, please go to an emergency room.', '02:14:10 ✓ reply sent · 2.7s', '02:14:10 guardrail: urgent-care advice included'),
        m('in', 'Yes, please book it', '02:14:31 agent.loop iter=2'),
        m('tool', 'calendar.book ✓', '02:14:32 → tool calendar.book(08:00) ✓'),
        m('out', 'Booked! Tomorrow at 8:00. Feel better ✓', '02:14:33 ✓ booked at 2 am · no human involved'),
      ],
      [
        m('tool', 'follow-up · 30-day return visit', '10:00:00 followup.claim → 6 eligible return visits', '10:00:00 business hours ok'),
        m('out', 'Hi! It’s been 30 days since your endocrinology visit and the doctor asked for a follow-up. Want to book it?', '10:00:02 ✓ follow-up sent'),
        m('in', 'Yes! Could it be Monday?', '10:14:19 agent.loop iter=1'),
        m('tool', 'calendar.slots → Monday · 3 open', '10:14:20 → tool calendar.slots(mon) · 3 open'),
        m('out', 'On Monday I have 8:30, 11:00 or 4:00 pm.', '10:14:21 ✓ reply sent · 1.6s'),
        m('in', '11:00', '10:14:33 agent.loop iter=2'),
        m('tool', 'calendar.book ✓ · funnel.move → follow-up booked', '10:14:34 → tool calendar.book(mon 11:00) ✓', '10:14:34 → tool funnel.move(patient, "follow-up")'),
        m('out', 'Booked! Monday at 11:00 ✓', '10:14:35 ✓ return visit recovered by follow-up'),
      ],
      [
        m('in', 'I need a receipt for yesterday’s appointment to claim it from my health plan', '15:40:12 wa-message-receiver ← +55 31 ••••-8093', '15:40:13 agent.loop iter=1'),
        m('tool', 'patient.lookup → yesterday · general practice', '15:40:13 → tool patient.lookup(phone) · 1 appointment'),
        m('out', 'Found yesterday’s appointment. Receipts are issued by the front desk, so I’ll pass you to them, ok?', '15:40:15 ✓ reply sent · 2.2s'),
        m('tool', 'handoff → front desk · summary sent', '15:40:15 → tool handoff(front desk, summary)', '15:40:15 ai paused for this conversation'),
        m('out', 'Done! The front desk already knows what you need and will reply here ✓', '15:40:16 ✓ handoff complete'),
        m('in', 'Perfect, thanks', '15:40:29 message → team (ai paused)'),
      ],
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    conversations: [
      [
        {
          chat: { kind: 'in', text: 'Hi! How much is a flight to Lisbon in March?' },
          log: ['21:30:05 wa-message-receiver ← +55 31 ••••-7710', '21:30:06 agent.loop iter=1'],
        },
        {
          chat: { kind: 'out', text: 'Hi! Let me put a quote together. Which city are you flying from, and how many people?' },
          log: ['21:30:08 ✓ reply sent · 2.3s'],
        },
        { chat: { kind: 'in', text: 'Belo Horizonte, 2 adults' }, log: ['21:30:24 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'flights.search(CNF → LIS) → 3 options · card sent' },
          log: ['21:30:25 → tool flights.search(CNF→LIS, mar, 2) · 3 options', '21:30:27 → tool send_media(card)'],
        },
        {
          chat: { kind: 'out', text: 'Found round trips from R$ 4,380 per person. I sent you the options 👆' },
          log: ['21:30:28 ✓ reply sent · 3.9s'],
        },
        { chat: { kind: 'in', text: 'I’ll take the cheapest' }, log: ['21:30:41 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → qualified · handoff → agent' },
          log: ['21:30:42 → tool funnel.move(lead, "qualified")', '21:30:42 → tool handoff(sales, summary)'],
        },
        {
          chat: { kind: 'out', text: 'Perfect! I’ve passed you to our travel consultant to finish the booking ✓' },
          log: ['21:30:43 ✓ lead qualified · summary sent to the team'],
        },
      ],
      [
        {
          chat: { kind: 'in', text: 'Do you have Cancún packages in July? We’re a couple' },
          log: ['12:18:33 wa-message-receiver ← +55 31 ••••-2245', '12:18:34 agent.loop iter=1'],
        },
        {
          chat: { kind: 'out', text: 'We do! Do you prefer all-inclusive or just flight + hotel?' },
          log: ['12:18:35 ✓ reply sent · 2.1s'],
        },
        { chat: { kind: 'in', text: 'All-inclusive' }, log: ['12:18:49 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'rag.search → Cancún packages · 3 hotels sent' },
          log: ['12:18:50 → tool rag.search("cancún july all inclusive")', '12:18:51 → tool send_media(3 hotels)'],
        },
        {
          chat: { kind: 'out', text: 'I have 7 all-inclusive nights from R$ 9,900 per person. I sent you the hotels 👆' },
          log: ['12:18:52 ✓ reply sent · 3.2s'],
        },
        { chat: { kind: 'in', text: 'We like the second one!' }, log: ['12:19:10 agent.loop iter=3'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → proposal · handoff → agent' },
          log: ['12:19:11 → tool funnel.move(lead, "proposal")', '12:19:11 → tool handoff(sales, summary)'],
        },
        {
          chat: { kind: 'out', text: 'Great choice! Our consultant will send you the proposal ✓' },
          log: ['12:19:12 ✓ proposal forwarded to the team'],
        },
      ],
      [
        {
          chat: { kind: 'tool', text: 'follow-up · no reply for 60 min' },
          log: ['16:02:00 followup.claim → 1 eligible lead', '16:02:00 24h window ok · business hours ok'],
        },
        {
          chat: { kind: 'out', text: 'Hi! You asked for a Santiago quote a little while ago. Still interested? August fares are going up' },
          log: ['16:02:02 ✓ follow-up 3/3 sent'],
        },
        { chat: { kind: 'in', text: 'Yes! But flying from São Paulo' }, log: ['16:04:47 agent.loop iter=1'] },
        {
          chat: { kind: 'tool', text: 'flights.search(GRU → SCL) → 4 options' },
          log: ['16:04:48 → tool flights.search(GRU→SCL, aug) · 4 options'],
        },
        {
          chat: { kind: 'out', text: 'From São Paulo it’s R$ 1,890 round trip. Want me to hold that fare?' },
          log: ['16:04:50 ✓ reply sent · 3.1s'],
        },
        { chat: { kind: 'in', text: 'Yes please!' }, log: ['16:05:02 agent.loop iter=2'] },
        {
          chat: { kind: 'tool', text: 'funnel.move → closing · handoff → agent' },
          log: ['16:05:03 → tool funnel.move(lead, "closing")', '16:05:03 → tool handoff(sales, summary)'],
        },
        {
          chat: { kind: 'out', text: 'Done! Our consultant is already on your booking ✓' },
          log: ['16:05:04 ✓ lead recovered by follow-up'],
        },
      ],
      [
        m('in', '¡Hola! ¿Cuánto cuesta un paquete a Río para 4 personas en enero?', '11:03:41 wa-message-receiver ← +54 11 ••••-5530', '11:03:42 agent.loop iter=1 · lang=es'),
        m('out', '¡Hola! Con gusto te ayudo. ¿Desde qué ciudad salen?', '11:03:43 ✓ reply sent (es) · 2.0s'),
        m('in', 'Buenos Aires', '11:03:58 agent.loop iter=2'),
        m('tool', 'packages.search(EZE → GIG) → 3 options', '11:03:59 → tool packages.search(EZE→GIG, jan, 4) · 3 options', '11:04:01 → tool send_media(card)'),
        m('out', 'Tengo 5 noches en Copacabana desde US$ 890 por persona. Te envié las opciones 👆', '11:04:02 ✓ reply sent (es) · 3.6s'),
        m('in', 'Perfecto, ¿cómo reservamos?', '11:04:20 agent.loop iter=3'),
        m('tool', 'funnel.move → qualified · handoff → agent', '11:04:21 → tool funnel.move(lead, "qualified")', '11:04:21 → tool handoff(sales, summary, lang=es)'),
        m('out', '¡Genial! Nuestra consultora te escribe ahora para cerrar la reserva ✓', '11:04:22 ✓ Spanish-speaking lead qualified'),
      ],
      [
        m('in', '🎤 Voice note · 0:14', '09:41:17 wa-message-receiver ← +55 21 ••••-3184 · audio/ogg'),
        m('tool', 'whisper → "I’d like to go to Rome in May with my mom"', '09:41:18 → tool whisper.transcribe(14s) ✓', '09:41:19 agent.loop iter=1'),
        m('out', 'What a great trip! Which city are you flying from?', '09:41:20 ✓ reply sent · 2.9s'),
        m('in', 'Rio', '09:41:36 agent.loop iter=2'),
        m('tool', 'flights.search(GIG → FCO) → 4 options · card sent', '09:41:37 → tool flights.search(GIG→FCO, may, 2) · 4 options', '09:41:39 → tool send_media(card)'),
        m('out', 'Found round trips from R$ 5,120 per person. I sent you the options 👆', '09:41:40 ✓ reply sent · 3.8s'),
        m('in', 'Great, go ahead', '09:42:02 agent.loop iter=3'),
        m('tool', 'handoff → agent · summary sent', '09:42:03 → tool handoff(sales, summary)'),
        m('out', 'Wonderful! Our consultant will issue your tickets now ✓', '09:42:04 ✓ lead qualified from a voice note'),
      ],
      [
        m('in', '📷 Image', '20:15:50 wa-message-receiver ← +55 31 ••••-9951 · image/jpeg'),
        m('tool', 'vision → ad "Maldives · 7 nights"', '20:15:51 → tool vision.describe(image) ✓', '20:15:52 agent.loop iter=1'),
        m('out', 'I see you’re interested in the Maldives! When would you like to go?', '20:15:53 ✓ reply sent · 3.0s'),
        m('in', 'Honeymoon, in November', '20:16:12 agent.loop iter=2'),
        m('tool', 'rag.search → honeymoon packages · 2 options', '20:16:13 → tool rag.search("maldives honeymoon november")', '20:16:14 → tool send_media(2 packages)'),
        m('out', 'Congratulations! I have 7 nights from R$ 18,500 per person. I sent you the packages 👆', '20:16:15 ✓ reply sent · 3.1s'),
        m('in', 'We love the first one', '20:16:40 agent.loop iter=3'),
        m('tool', 'funnel.move → proposal · handoff → agent', '20:16:41 → tool funnel.move(lead, "proposal")', '20:16:41 → tool handoff(sales, summary)'),
        m('out', 'Great choice! Our consultant will reach out to sort out the details ✓', '20:16:42 ✓ lead qualified from an image'),
      ],
      [
        m('tool', 'follow-up · no reply for 30 min', '14:31:00 followup.claim → 1 eligible lead', '14:31:00 24h window ok · business hours ok'),
        m('out', 'Hi! Did you get a chance to look at the Buenos Aires quote?', '14:31:01 ✓ follow-up 2/3 sent'),
        m('in', 'I did, but it’s too expensive', '14:33:26 agent.loop iter=1'),
        m('tool', 'flights.search(flexible dates) → June is cheaper', '14:33:27 → tool flights.search(GRU→EZE, flex) · 5 dates'),
        m('out', 'I get it! In June the same trip is R$ 1,320, about 30% less. Want to see it?', '14:33:29 ✓ reply sent · 3.3s'),
        m('in', 'Now we’re talking', '14:33:51 agent.loop iter=2'),
        m('tool', 'funnel.move → qualified · handoff → agent', '14:33:52 → tool funnel.move(lead, "qualified")', '14:33:52 → tool handoff(sales, summary)'),
        m('out', 'Deal! Our consultant is sending you the June options ✓', '14:33:53 ✓ price objection handled'),
      ],
      [
        m('in', 'I need to change the name on a ticket I bought from you', '17:48:03 wa-message-receiver ← +55 31 ••••-2767', '17:48:04 agent.loop iter=1'),
        m('tool', 'rag.search → change policy', '17:48:05 → tool rag.search("ticket name change")'),
        m('out', 'Name changes depend on the airline. I’ll pass this to our team to check, ok?', '17:48:06 ✓ reply sent · 2.6s'),
        m('tool', 'handoff → agent · ai paused', '17:48:06 → tool handoff(sales, summary)', '17:48:06 label ai-inactive · 5 min pause'),
        m('out', 'Done! Our consultant has your booking and will reply here ✓', '17:48:07 ✓ a human took over'),
        m('in', 'Great, I’ll wait', '17:48:20 message → team (ai paused)'),
      ],
    ],
  },
];

export const agentDemo: Record<Lang, DemoScenario[]> = { pt, en };
