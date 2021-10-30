import './styles.sass';
import search from './search.svg';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Searchbar = ({ value, onChange }: Props): JSX.Element => (
  <div className="SearchbarContainer">
    <input className="Searchbar" value={value} onChange={onChange} placeholder="Search" />
    <img src={search} alt="search" width="30px" />
  </div>
);
