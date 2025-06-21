import styles from './style.module.css';

import { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export const Dialog = ({ closeToast, data }: ToastContentProps<string>) => {
  return (
    <>
      <div className={styles.dialogContainer}>
        <p>{data}</p>
        <div className={styles.dialogContainer__buttons}>
          <DefaultButton
            aria-label='Confirmar ação e fechar'
            title='Confirmar ação e fechar'
            onClick={() => closeToast(true)}
            icon={<ThumbsUp />}
          />
          <DefaultButton
            aria-label='Cancelar ação e fechar'
            title='Cancelar ação e fechar'
            onClick={() => closeToast(false)}
            icon={<ThumbsDown />}
            color='red'
          />
        </div>
      </div>
    </>
  );
};
