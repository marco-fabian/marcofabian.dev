import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Imagens de compartilhamento (1200×630) geradas no build, no mesmo visual do site.
// TTFs da Geist (licença OFL) versionados em assets/fonts, porque o satori não lê woff2.
const fontDir = 'assets/fonts';
const fonts = Promise.all([
  readFile(`${fontDir}/Geist-Regular.ttf`),
  readFile(`${fontDir}/Geist-SemiBold.ttf`),
  readFile(`${fontDir}/GeistMono-Regular.ttf`),
]).then(([regular, semibold, mono]) => [
  { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
  { name: 'Geist', data: semibold, weight: 600 as const, style: 'normal' as const },
  { name: 'Geist Mono', data: mono, weight: 400 as const, style: 'normal' as const },
]);

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

const INK = '#000';
const TEXT = '#f5f5f5';
const MUTED = '#8a8a8a';
const LINE = '#222';
const LIVE = '#3ddc84';

export type OgInput = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  stats?: { value: string; label: string }[];
  status?: string;
};

export async function renderOg({ eyebrow, title, subtitle, stats, status }: OgInput) {
  const footer = stats?.length
    ? h(
        'div',
        { gap: 56, paddingTop: 28, borderTop: `1px solid ${LINE}` },
        stats.map((s) =>
          h('div', { flexDirection: 'column', gap: 4 }, [
            h('div', { fontSize: 44, fontWeight: 600, color: LIVE, letterSpacing: -1 }, s.value),
            h('div', { fontSize: 22, color: MUTED }, s.label),
          ])
        )
      )
    : h('div', { alignItems: 'center', gap: 14, fontSize: 24, color: MUTED }, [
        h('div', { width: 14, height: 14, borderRadius: 7, background: LIVE }),
        status ?? '',
      ]);

  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 72px',
      background: INK,
      color: TEXT,
      fontFamily: 'Geist',
    },
    [
      h('div', { justifyContent: 'space-between', alignItems: 'center' }, [
        h('div', { fontSize: 30, fontWeight: 600, letterSpacing: -1 }, 'MF'),
        h('div', { fontFamily: 'Geist Mono', fontSize: 22, color: MUTED }, 'marcofabian.dev'),
      ]),
      h('div', { flexDirection: 'column', gap: 18 }, [
        h('div', { fontFamily: 'Geist Mono', fontSize: 24, color: MUTED }, eyebrow),
        h(
          'div',
          { fontSize: title.length > 48 ? 58 : 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 },
          title
        ),
        subtitle ? h('div', { fontSize: 28, color: MUTED, lineHeight: 1.4, maxWidth: 940 }, subtitle) : null,
      ]),
      footer,
    ]
  );

  const svg = await satori(tree as any, { width: 1200, height: 630, fonts: await fonts });
  return new Resvg(svg).render().asPng();
}
