import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type CaseEntry = CollectionEntry<'cases'>;

// O id do glob é "pt/kestra": o prefixo é o idioma, o resto é o slug.
export const caseLang = (entry: CaseEntry) => entry.id.split('/')[0] as Lang;
export const caseSlug = (entry: CaseEntry) => entry.id.split('/').slice(1).join('/');

export async function getCases(lang: Lang) {
  const all = await getCollection('cases', (e) => caseLang(e) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function nextCase(list: CaseEntry[], current: CaseEntry) {
  if (list.length < 2) return undefined;
  const i = list.findIndex((e) => e.id === current.id);
  return list[(i + 1) % list.length];
}
