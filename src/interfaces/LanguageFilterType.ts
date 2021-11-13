export interface LanguageFilterType {
  langId: string;
  langName: string;
  langColor: string;
  isSelected: boolean;
  onClick: (_langName: string) => void;
}
