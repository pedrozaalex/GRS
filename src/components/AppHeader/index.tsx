import { ReactNode } from 'react';
import './styles.sass';
import octopus from './octopus.svg';

export type Props = {
  children?: ReactNode;
};

export const AppHeader = ({ children }: Props): JSX.Element => (
  <>
    <header className="App-header">
      <div className="TitleLogo">
        <img src={octopus} alt="logo" height="40px" />
        <p>GitHub Repo Search</p>
      </div>
      {children}
    </header>
    <div className="header-padding" />
  </>
);
