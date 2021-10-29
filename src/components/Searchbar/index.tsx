import "./styles.sass";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Searchbar = ({ value, onChange }: Props) => {
  return (
    <div className="SearchbarContainer">
      <input
        className="Searchbar"
        value={value}
        onChange={onChange}
        placeholder="Search repos"
      />
      <img src="src/search.svg" alt="search" width="30px" />
    </div>
  );
};
