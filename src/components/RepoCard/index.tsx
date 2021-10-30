import './styles.sass';
import { TreatedRepo } from '../../github/types';
import { LanguageLabel } from '../LanguageLabel';
import { toggleLanguage } from '../LanguageFilter';
import { isEmpty } from '../../utils/isEmpty';
import { LanguageRecord } from '../../interfaces/LanguageRecord';

type RepoCardProps = {
  data: TreatedRepo;
  globalLanguagesList: LanguageRecord;
  setGlobalLanguagesList: (languages: LanguageRecord) => void;
};

export const RepoCard = (props: RepoCardProps): JSX.Element => {
  const {
    data: {
      id,
      name,
      description,
      stargazerCount,
      languages,
      url,
      homepageUrl,
      owner,
      licenseInfo,
    },
    globalLanguagesList,
    setGlobalLanguagesList,
  } = props;

  if (isEmpty(globalLanguagesList)) return <></>;

  return (
    <>
      <li key={id} className="repoCard">
        <h3>{name}</h3>
        <p>{description}</p>
        {url && (
          <p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Go to repo
            </a>
          </p>
        )}
        {homepageUrl && (
          <p>
            <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
              Contact
            </a>
          </p>
        )}
        <p>{owner?.login}</p>
        <div>
          {languages?.map((lang) => (
            <LanguageLabel
              key={lang.name}
              language={lang}
              isSelected={globalLanguagesList[lang.id].isSelected}
              onClick={() => toggleLanguage(lang.id, globalLanguagesList, setGlobalLanguagesList)}
            />
          ))}
        </div>
        <p>{stargazerCount} 🌟</p>
        {licenseInfo?.key && <a href={licenseInfo.url}>{licenseInfo.key.toLocaleUpperCase()}</a>}
      </li>
    </>
  );
};
