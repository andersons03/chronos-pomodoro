import style from './style.module.css';

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export const DefaultButton = ({
  icon,
  color = 'green',
  ...props
}: DefaultButtonProps) => {
  return (
    <>
      <button className={`${style.button} ${style[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
};
