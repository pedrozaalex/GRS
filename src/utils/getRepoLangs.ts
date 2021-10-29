import { TreatedRepo } from "../github/types";

// receives a TreatedRepo and returns an array with all the languages used in the repo
export function getRepoLangs(repo: TreatedRepo): string[] {
  const { languages } = repo;
  if (!languages) {
    return [];
  }
  return languages.map((lang) => lang.name);
}
