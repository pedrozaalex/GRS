import "./App.sass";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useDebouncedState from "./useDebouncedState";
import { SearchResult } from "./github/types";
import { SearchReposQuery } from "./github/queries";
import { RepoList } from "./components/RepoList";
import { AppHeader } from "./components/AppHeader";
import { Searchbar } from "./components/Searchbar";
import { MainContainer } from "./components/MainContainer";
import LanguageFilter from "./components/LanguageFilter";
import { treatSearchResult } from "./github/treatSearchResult";

export type LanguageRecord = {
  [id: string]: {
    langName: string;
    langColor: string;
    isSelected: boolean;
  };
};

function App() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useDebouncedState("", () =>
    setSearch(searchInput)
  );

  const [globalLanguageList, setGlobalLanguageList] = useState<LanguageRecord>(
    {}
  );

  const searchResult = useQuery<SearchResult>(SearchReposQuery, {
    variables: {
      queryString: search,
    },
  });

  const {
    data: searchdata,
    loading: isSearchLoading,
    error: searchError,
  } = searchResult;
  const treatedData = treatSearchResult(searchdata);

  // update language list when search result is updated
  useEffect(() => {
    const newLanguageList: LanguageRecord = {};
    treatedData.repositories.forEach((repo) => {
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
  }, [searchResult.data]);

  return (
    <>
      <div className="App">
        <AppHeader>
          <Searchbar
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
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
                data={treatedData}
                loading={isSearchLoading}
                error={searchError}
                globalLanguagesList={globalLanguageList}
                setGlobalLanguagesList={setGlobalLanguageList}
              />
            </>
          ) : (
            "Enter a search query to begin"
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default App;
