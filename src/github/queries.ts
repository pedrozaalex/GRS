import { gql } from '@apollo/client';

export const SearchReposQuery = gql`
  query listRepos($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 50) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
            languages(first: 10) {
              nodes {
                id
                name
                color
              }
            }
            url
            homepageUrl
            owner {
              login
              url
            }
            licenseInfo {
              key
              url
            }
          }
        }
      }
    }
  }
`;
