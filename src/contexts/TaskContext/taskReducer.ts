import { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActions, TaskActionsModel } from './TaskActions';

export function taskReducer(
  prevState: TaskStateModel,
  action: TaskActionsModel,
) {
  switch (action.type) {
    case TaskActions.START_CYCLE: {
      const newTask = action.payload;
      const secondsRemaing = newTask.duration * 60;
      const nextCycle = getNextCycle(prevState.currentCycle);

      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaing,
        formattedSecondsRemaing: formatSecondsToMinutes(secondsRemaing),
        tasks: [...prevState.tasks, newTask],
        config: { ...prevState.config },
      };
    }
    case TaskActions.CONPLETE_TASK: {
      return {
        ...prevState,
        secondsRemaing: 0,
        formattedSecondsRemaing: '00:00',
        activeTask: null,
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id == task.id) {
            return { ...task, completeDate: Date.now() };
          }

          return task;
        }),
      };
    }
    case TaskActions.INTERRUPT_CYCLE: {
      return {
        ...prevState,
        secondsRemaing: 0,
        formattedSecondsRemaing: '00:00',
        activeTask: null,
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id == task.id) {
            return { ...task, interruptDate: Date.now() };
          }

          return task;
        }),
      };
    }
    case TaskActions.COUNT_DOWN: {
      const secondsRemaing = action.payload.secondsRemaining;
      return {
        ...prevState,
        secondsRemaing: secondsRemaing,
        formattedSecondsRemaing: formatSecondsToMinutes(secondsRemaing),
      };
    }
    case TaskActions.RESET_TASKS: {
      return {
        ...initialTaskState,
        tasks: [],
        secondsRemaing: 0,
        formattedSecondsRemaing: '00:00',
        activeTask: null,
        currentCycle: 0,
      };
    }
    case TaskActions.CHANGE_SETTINGS: {
      return {
        ...prevState,
        config: { ...action.payload },
      };
    }
    default: {
      return prevState;
    }
  }
}
