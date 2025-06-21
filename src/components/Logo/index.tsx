import { Timer } from 'lucide-react';
import style from './style.module.css';
import { RouterLink } from '../RouterLink';

export const Logo = () => {
  return (
    <h1 className={style.logo}>
      <RouterLink href='/' className={style.logoLink}>
        <Timer /> Chronos
      </RouterLink>
    </h1>
  );
};
