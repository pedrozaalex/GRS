import './styles.sass';
import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
import { TreatedRepo, TreatedSearchResult } from '../../github/types';
import { RepoCard } from '../RepoCard';
import { Spinner } from '../Spinner';
import { shouldRepoBeFiltered } from '../../utils/shouldRepoBeFiltered';
import { langRecordToFilters } from '../../utils/langRecordToFilters';
import { LanguageRecord } from '../../interfaces/LanguageRecord';

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
}: RepoListProps): JSX.Element => {
  const repos = data.repositories;

  const selectedFilters: string[] = langRecordToFilters(globalLanguagesList);

  const filteredRepos = useMemo<TreatedRepo[]>(
    () => repos.filter((repo) => !shouldRepoBeFiltered(repo, selectedFilters)),
    [repos, selectedFilters]
  );

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
          {filteredRepos.map((repo, index) => (
            <RepoCard
              key={repo.id || index}
              data={repo}
              globalLanguagesList={globalLanguagesList}
              setGlobalLanguagesList={setGlobalLanguagesList}
            />
          ))}
        </ul>
      </>
    );
  }, [error, globalLanguagesList, filteredRepos, loading, repos?.length, setGlobalLanguagesList]);
};
