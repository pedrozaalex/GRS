import "./styles.sass";

type Props = {
  children?: React.ReactNode;
};

export const MainContainer = ({ children }: Props) => {
  return <div className="MainContainer">{children}</div>;
};
