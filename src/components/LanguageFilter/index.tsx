import { LanguageRecord } from '../../interfaces/LanguageRecord';
import { LanguageLabel } from '../LanguageLabel';

type LanguageFilterType = {
  langId: string;
  langName: string;
  langColor: string;
  isSelected: boolean;
  onClick: (_langName: string) => void;
};

type Props = {
  globalLanguageList: LanguageRecord;
  setGlobalLanguageList: (languages: LanguageRecord) => void;
};

export const toggleLanguage = (
  langId: string,
  globalLanguageList: LanguageRecord,
  setGlobalLanguageList: (languages: LanguageRecord) => void
): void => {
  // set new global language list when a language is toggled
  const newGlobalLanguageList = {
    ...globalLanguageList,
    [langId]: {
      ...globalLanguageList[langId],
      isSelected: !globalLanguageList[langId].isSelected,
    },
  };
  setGlobalLanguageList(newGlobalLanguageList);
};

export default function LanguageFilter({
  globalLanguageList,
  setGlobalLanguageList,
}: Props): JSX.Element {
  const selectableLanguages: LanguageFilterType[] = [];

  // fill selectableLanguages with languages stored in props
  for (const [langId, langData] of Object.entries(globalLanguageList)) {
    selectableLanguages.push({
      langId,
      langName: langData.langName,
      langColor: langData.langColor,
      isSelected: globalLanguageList[langId].isSelected,
      onClick: () => {
        toggleLanguage(langId, globalLanguageList, setGlobalLanguageList);
      },
    });
  }

  return (
    <div className="language-filter">
      <h3>Filter by language</h3>
      <ul>
        {selectableLanguages.map((lang) => (
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
      </ul>
    </div>
  );
}
