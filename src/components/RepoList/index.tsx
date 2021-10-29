import "./styles.sass";
import { ApolloError } from "@apollo/client";
import { useMemo } from "react";
import { TreatedRepo, TreatedSearchResult } from "../../github/types";
import { RepoCard } from "../RepoCard";
import { Spinner } from "../Spinner";
import { LanguageRecord } from "../../App";
import { shouldRepoBeFiltered } from "../../utils/shouldRepoBeFiltered";
import { langRecordToFilters } from "../../utils/langRecordToFilters";

type RepoListProps = {
  data: TreatedSearchResult;
  error: ApolloError | undefined;
  loading: boolean;
  globalLanguagesList: LanguageRecord;
  setGlobalLanguagesList: (langList: LanguageRecord) => void;
};

export const RepoList = ({
  loading,
  error,
  data,
  globalLanguagesList,
  setGlobalLanguagesList,
}: RepoListProps) => {
  const repos = data.repositories;

  const selectedFilters: string[] = langRecordToFilters(globalLanguagesList);

  const filteredRepos = useMemo<TreatedRepo[]>(() => {
    return repos.filter((repo) => !shouldRepoBeFiltered(repo, selectedFilters));
  }, [repos, selectedFilters]);

  return useMemo(() => {
    if (loading) return <Spinner />;

    if (error) {
      console.error(error);
      return (
        <>
          <span>Error :{error.message}</span>
        </>
      );
    }

    if (!repos?.length) return <p>No data to display</p>;

    return (
      <>
        <h2>Found {filteredRepos.length} matching repos</h2>
        <ul className="repoCardContainer">
          {filteredRepos.map((repo, index) => {
            return (
              <RepoCard
                key={repo.id || index}
                data={repo}
                globalLanguagesList={globalLanguagesList}
                setGlobalLanguagesList={setGlobalLanguagesList}
              />
            );
          })}
        </ul>
      </>
    );
  }, [loading, error, repos, filteredRepos, globalLanguagesList]);
};
