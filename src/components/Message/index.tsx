import { Bounce, ToastContainer } from 'react-toastify';

type MessageProps = {
  children: React.ReactNode;
};

export const Message = ({ children }: MessageProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
};
