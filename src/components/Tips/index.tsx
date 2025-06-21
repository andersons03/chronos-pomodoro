import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export const Tips = () => {
  const { taskState } = useTaskContext();
  const nextCycle = getNextCycle(taskState.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {taskState.config.workTime}min</span>,
    shortBreakTime: (
      <span>Descanse por {taskState.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Descanso longo</span>,
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{taskState.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>Próximo descaso é de {taskState.config.shortBreakTime}min</span>
    ),
    longBreakTime: <span>Próximo será o descanso longo</span>,
  };

  return (
    <>
      {!taskState.activeTask && tipsForNoActiveTask[nextCycleType]}
      {!!taskState.activeTask &&
        tipsForWhenActiveTask[taskState.activeTask.type]}
    </>
  );
};
