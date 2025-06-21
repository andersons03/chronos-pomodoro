import style from './style.module.css';

type DefaultInputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export const DefaultInput = ({
  id,
  labelText,
  type,
  ...others
}: DefaultInputProps) => {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input className={style.input} id={id} type={type} {...others} />
    </>
  );
};
