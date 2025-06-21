import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (message: string) => {
    showMessage.dismiss();
    toast.success(message);
  },
  info: (message: string) => {
    showMessage.dismiss();
    toast.info(message);
  },
  warning: (message: string) => {
    showMessage.dismiss();
    toast.warning(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  confirm: (data: string, onClosing: (confirmation: boolean) => void) => {
    showMessage.dismiss();
    toast(Dialog, {
      data: data,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: confirmation => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
    });
  },
  dismiss: () => toast.dismiss(),
};
