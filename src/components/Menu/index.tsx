import { History, House, MoonIcon, Settings, SunIcon } from 'lucide-react';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export const Menu = () => {
  const [theme, setTheme] = useState<AvailableThemes>(getSavedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  function getSavedTheme() {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as AvailableThemes;
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }

    return 'dark';
  }

  return (
    <nav className={style.menu}>
      <RouterLink
        href='/'
        className={style.menuLink}
        aria-label='Ir para home'
        title='Ir para home'
      >
        <House />
      </RouterLink>
      <RouterLink
        href='/historico'
        className={style.menuLink}
        aria-label='Ver historico'
        title='Ver historico'
      >
        <History />
      </RouterLink>
      <RouterLink
        href='/configuracoes'
        className={style.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <Settings />
      </RouterLink>
      <RouterLink
        href='#'
        className={style.menuLink}
        aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        title={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
};
