import './App.sass';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import useDebouncedState from './useDebouncedState';
import { SearchResult, TreatedSearchResult } from './github/types';
import { SearchReposQuery } from './github/queries';
import { RepoList } from './components/RepoList';
import { AppHeader } from './components/AppHeader';
import { Searchbar } from './components/Searchbar';
import { MainContainer } from './components/MainContainer';
import LanguageFilter from './components/LanguageFilter';
import { treatSearchResult } from './github/treatSearchResult';
import { LanguageRecord } from './interfaces/LanguageRecord';

function App(): JSX.Element {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useDebouncedState<string>('', () => setSearch(searchInput));
  const [globalLanguageList, setGlobalLanguageList] = useState<LanguageRecord>({});
  const [treatedSearchResult, setTreatedSearchResult] = useState<TreatedSearchResult>({
    repoCount: 0,
    repositories: [],
  });

  const searchResult = useQuery<SearchResult>(SearchReposQuery, {
    variables: {
      queryString: search,
    },
  });
  const { data: searchResultdata, loading: isSearchLoading, error: searchError } = searchResult;

  // treat data whenever search result changes
  useEffect(() => {
    setTreatedSearchResult(treatSearchResult(searchResultdata));
  }, [searchResultdata]);

  // update language list when treated search result changes
  useEffect(() => {
    const newLanguageList: LanguageRecord = {};
    treatedSearchResult.repositories.forEach((repo) => {
      repo.languages?.forEach((language) => {
        if (!newLanguageList[language.id]) {
          newLanguageList[language.id] = {
            langName: language.name,
            langColor: language.color,
            isSelected: false,
          };
        }
      });
    });

    setGlobalLanguageList(newLanguageList);
  }, [treatedSearchResult]);

  return (
    <>
      <div className="App">
        <AppHeader>
          <Searchbar onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
        </AppHeader>

        <MainContainer>
          <h1>Github Repo Search</h1>
          {search ? (
            <>
              <LanguageFilter
                globalLanguageList={globalLanguageList}
                setGlobalLanguageList={setGlobalLanguageList}
              />
              <RepoList
                data={treatedSearchResult}
                loading={isSearchLoading}
                error={searchError}
                globalLanguagesList={globalLanguageList}
                setGlobalLanguagesList={setGlobalLanguageList}
              />
            </>
          ) : (
            'Enter a search query to begin'
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default App;
