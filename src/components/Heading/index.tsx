import style from './style.module.css';

type HeadingProps = {
  children: React.ReactNode;
}

export const Heading = ({children}: HeadingProps) => {
  return (
    <h1 className={style.heading}>{children}</h1>
  )
}
