import { TaskModel } from './TaskModel';

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaing: number;
  formattedSecondsRemaing: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
