import { TreatedRepo } from '../github/types';
import { getArrayOverlap } from './getArrayOverlap';
import { getRepoLangs } from './getRepoLangs';

/**
 * receives a repo and a list of languages and returns
 * true if none of the languages in the list are in the repo's languages
 */
export function shouldRepoBeFiltered(repo: TreatedRepo, filterLanguages: string[]): boolean {
  if (!filterLanguages || !filterLanguages.length) return false;
  return getArrayOverlap(getRepoLangs(repo), filterLanguages).length === 0;
}
