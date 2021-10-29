import { SearchResult, TreatedSearchResult } from "./types";

/**
 * 
 * @param searchResult the graphql query result
 * @returns a treated version of the results, optimized for readability
 */
export function treatSearchResult(
  searchResult?: SearchResult
): TreatedSearchResult {
  if (!searchResult)
    return {
      repoCount: 0,
      repositories: [],
    };

  const { search } = searchResult;
  const treatedSearchResult: TreatedSearchResult = {
    repoCount: search?.repositoryCount || 0,
    repositories:
      search?.edges?.map(({ node }) => {
        return {
          name: node?.name,
          description: node?.description,
          url: node?.url,
          homepageUrl: node?.homepageUrl,
          stargazerCount: node?.stargazerCount,
          languages: node?.languages?.nodes?.map((n) => {
            return {
              id: n.id,
              name: n.name,
              color: n.color,
            };
          }),
        };
      }) ?? [],
  };
  return treatedSearchResult;
}
