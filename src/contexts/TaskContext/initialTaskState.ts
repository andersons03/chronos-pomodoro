import { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaing: 0,
  formattedSecondsRemaing: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
