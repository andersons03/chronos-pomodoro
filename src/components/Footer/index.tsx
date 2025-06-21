import { Link } from 'react-router';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/sobre'>Entenda como funciona a técnica pomodoro</Link>
      <Link to='/'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </Link>
    </footer>
  );
}
