import { LanguageRecord } from '../interfaces/LanguageRecord';

/**
 * receives a list of type LanguageRecord and returns an array with all the
 * language names which are currently selected
 *  */
export function langRecordToFilters(langData: LanguageRecord): string[] {
  return (
    Object.keys(langData)
      // filter out the languages which are selected
      .filter((lang) => langData[lang].isSelected)
      // return an array with the language names
      .map((key) => langData[key].langName)
  );
}
