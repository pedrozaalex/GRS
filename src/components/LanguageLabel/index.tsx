import "./styles.sass";
import { LanguageData } from "../../github/types";
import { useState } from "react";
import { darkenColor } from "../../utils/darkenColor";
import { rgba } from "../../utils/rgba";

type Prop = {
  language: LanguageData;
  onClick?: (langName: string) => void;
  isSelected: boolean;
};

export const LanguageLabel = ({ language, onClick, isSelected }: Prop) => {
  const { name: languageName, color: languageColor } = language;

  if (!languageName || !languageColor) return null;

  const handleClick = () => {
    onClick && typeof onClick === "function" && onClick(languageName);
  };

  return (
    <div
      className={`language-label ${isSelected ? "selected" : ""}`}
      style={{
        backgroundColor: rgba(languageColor, 0.5),
        color: rgba(darkenColor(languageColor, 0.3), 0.5),
        transition: "all 0.2s ease-in-out",
        ...(isSelected && {
          backgroundColor: languageColor,
          color: darkenColor(languageColor, 0.3),
          border: `2px solid ${darkenColor(languageColor, 0.3)}`
        }),
      }}
      onClick={handleClick}
    >
      {languageName}
    </div>
  );
};
