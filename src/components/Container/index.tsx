import style from './style.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className={style.container}>{children}</div>;
};
