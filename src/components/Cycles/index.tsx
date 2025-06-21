import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import style from './style.module.css';

export const Cycles = () => {
  const { taskState } = useTaskContext();

  const tasks = Array.from({ length: taskState.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'Indicador de ciclo de trabalho',
    shortBreakTime: 'Indicador de ciclo de descanço curto',
    longBreakTime: 'Indicador de ciclo de descanço longo',
  };

  return (
    <div className={style.cycles}>
      <span>Ciclos:</span>
      <div className={style.cycleDots}>
        {tasks.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              title={cycleDescriptionMap[nextCycleType]}
              aria-label={cycleDescriptionMap[nextCycleType]}
              key={`${nextCycleType}_${nextCycle}`}
              className={`${style.cycleDot} ${style[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
