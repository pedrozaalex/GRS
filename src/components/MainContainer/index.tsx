import './styles.sass';

type Props = {
  children?: React.ReactNode;
};

export const MainContainer = ({ children }: Props): JSX.Element => (
  <div className="MainContainer">{children}</div>
);
