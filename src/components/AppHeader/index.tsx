import "./styles.sass";

type Props = {
  children?: React.ReactNode;
};

export const AppHeader = ({ children }: Props): JSX.Element => {
  return (
    <>
      <header className="App-header">
        <span>
          <img src="src/octopus.svg" alt="logo" height="40px"/>{" "}
          GitHub Repo Search</span>
        {children}
      </header>
      <div className="header-padding" />
    </>
  );
};