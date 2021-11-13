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
import { LanguageFilter } from './components/LanguageFilter';
import { treatSearchResult } from './github/treatSearchResult';
import { LanguageRecord } from './interfaces/LanguageRecord';
import { LanguageFilterType } from './interfaces/LanguageFilterType';
import { LanguageLabel } from './components/LanguageLabel';

export const toggleLanguage = (
  langId: string,
  globalLanguageList: LanguageRecord,
  setGlobalLanguagesList: React.Dispatch<React.SetStateAction<LanguageRecord>>
): void => {
  // set new global language list when a language is toggled
  const newGlobalLanguageList = {
    ...globalLanguageList,
    [langId]: {
      ...globalLanguageList[langId],
      isSelected: !globalLanguageList[langId].isSelected,
    },
  };
  setGlobalLanguagesList(newGlobalLanguageList);
};

function App(): JSX.Element {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useDebouncedState<string>('', () => setSearch(searchInput));
  const [globalLanguageList, setGlobalLanguagesList] = useState<LanguageRecord>({});
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

    setGlobalLanguagesList(newLanguageList);
  }, [treatedSearchResult]);

  const selectableLanguages: LanguageFilterType[] = [];

  // fill selectableLanguages with languages stored in props
  for (const [langId, langData] of Object.entries(globalLanguageList)) {
    selectableLanguages.push({
      langId,
      langName: langData.langName,
      langColor: langData.langColor,
      isSelected: globalLanguageList[langId].isSelected,
      onClick: () => {
        toggleLanguage(langId, globalLanguageList, setGlobalLanguagesList);
      },
    });
  }

  return (
    <>
      <div className="App">
        <AppHeader>
          <Searchbar onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
        </AppHeader>

        <MainContainer>
          {search ? (
            <>
              <LanguageFilter
                languages={selectableLanguages.map((lang) => (
                  <LanguageLabel
                    key={lang.langName}
                    language={{
                      id: lang.langId,
                      name: lang.langName,
                      color: lang.langColor,
                    }}
                    isSelected={lang.isSelected}
                    onClick={lang.onClick}
                  />
                ))}
              />
              <RepoList
                data={treatedSearchResult}
                loading={isSearchLoading}
                error={searchError}
                globalLanguagesList={globalLanguageList}
                setGlobalLanguagesList={setGlobalLanguagesList}
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
