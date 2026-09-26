import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg, type OgInput } from '../../lib/og';
import { getCases, caseSlug } from '../../lib/cases';
import { useTranslations, languages, type Lang } from '../../i18n/ui';

export const getStaticPaths = (async () => {
  const langs = Object.keys(languages) as Lang[];
  const paths: { params: { path: string }; props: OgInput }[] = [];

  for (const lang of langs) {
    const t = useTranslations(lang);
    paths.push({
      params: { path: `home-${lang}` },
      props: {
        eyebrow: 'Marco Fabian · AI Engineer',
        title: t('hero.title'),
        subtitle: t('hero.subtitle'),
        status: t('hero.status'),
      },
    });

    for (const entry of await getCases(lang)) {
      const d = entry.data;
      paths.push({
        params: { path: `cases/${lang}/${caseSlug(entry)}` },
        props: {
          eyebrow: `case ${String(d.order).padStart(2, '0')} · ${d.client}`,
          title: d.title,
          stats: d.results.slice(0, 3),
        },
      });
    }
  }

  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as OgInput);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
