import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import style from './style.module.css';

export const CountDown = () => {
  const { taskState } = useTaskContext();
  return <div className={style.timer}>{taskState.formattedSecondsRemaing}</div>;
};
