import { TreatedRepo } from '../github/types';
import { getRepoLangs } from './getRepoLangs';

/**
 * receives a repo and a list of languages and returns
 * true if at least one of the languages in the FILTER
 * is NOT included in the repo's languages
 */
export function shouldRepoBeFiltered(repo: TreatedRepo, filterLanguages: string[]): boolean {
  if (!filterLanguages || !filterLanguages.length) return false;

  const repoLangs = getRepoLangs(repo);

  return filterLanguages.some((lang) => !repoLangs.includes(lang));
}
