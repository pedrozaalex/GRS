export interface RateLimit {
  cost?: number;
  remaining?: number;
  resetAt?: Date;
}

export interface PageInfo {
  endCursor?: string;
  startCursor?: string;
}

export interface LanguageData {
  id: string;
  name: string;
  color: string;
}

export interface Language {
  nodes?: LanguageData[];
}

export interface Owner {
  login?: string;
  url?: string;
}

export interface LicenseInfo {
  key?: string;
  url?: string;
}

export interface RepoData {
  id?: string;
  name?: string;
  description?: string;
  stargazerCount?: number;
  languages?: Language;
  url?: string;
  homepageUrl?: string;
  owner?: Owner;
  licenseInfo?: LicenseInfo;
}

export interface RepoMatch {
  node?: RepoData;
}

export interface Search {
  repositoryCount?: number;
  pageInfo?: PageInfo;
  edges?: RepoMatch[];
}

export interface SearchResult {
  rateLimit?: RateLimit;
  search?: Search;
}

export interface TreatedLanguages {
  languages?: LanguageData[];
}

export interface TreatedRepo {
  id?: string;
  name?: string;
  description?: string;
  stargazerCount?: number;
  languages?: LanguageData[];
  url?: string;
  homepageUrl?: string;
  owner?: Owner;
  licenseInfo?: LicenseInfo;
}

export type TreatedSearchResult = {
  repoCount: number;
  repositories: TreatedRepo[];
};
