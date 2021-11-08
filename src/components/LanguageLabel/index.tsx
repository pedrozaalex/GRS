import './styles.sass';
import { LanguageData } from '../../github/types';
import { darkenColor } from '../../utils/darkenColor';
import { rgba } from '../../utils/rgba';

type Prop = {
  language: LanguageData;
  onClick?: (langName: string) => void;
  isSelected: boolean;
};

export const LanguageLabel = ({ language, onClick, isSelected }: Prop): JSX.Element | null => {
  const { name: languageName, color: languageColor } = language;

  if (!languageName || !languageColor) return null;

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') onClick(languageName);
  };

  return (
    <div
      className={`language-label ${isSelected ? 'selected' : ''}`}
      // inline style is needed to dynamically transform the color
      // provided by the API and make it darker or lighter depending
      // on the selected state
      style={{
        backgroundColor: rgba(languageColor, 0.5),
        color: rgba(darkenColor(languageColor, 0.3), 0.5),
        transition: 'all 0.2s ease-in-out',
        ...(isSelected && {
          backgroundColor: languageColor,
          color: darkenColor(languageColor, 0.3),
          border: `2px solid ${darkenColor(languageColor, 0.3)}`,
        }),
      }}
      onClick={handleClick}
    >
      {languageName}
    </div>
  );
};
