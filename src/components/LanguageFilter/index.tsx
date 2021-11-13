import '../LanguageFilter/styles.sass';

type Props = {
  languages: React.ReactNode[];
};

export function LanguageFilter({ languages }: Props): JSX.Element {
  return (
    <div className="language-filter">
      {!!languages && <h3>Filter by language</h3>}
      <ul className="language-filter-list">{languages}</ul>
    </div>
  );
}
