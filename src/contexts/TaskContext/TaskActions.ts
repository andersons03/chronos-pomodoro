import { TaskModel } from '../../models/TaskModel';
import { TaskStateModel } from '../../models/TaskStateModel';
// import { TaskStateModel } from '../../models/TaskStateModel';

export enum TaskActions {
  START_CYCLE = 'START_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  COUNT_DOWN = 'COUNT_DOWN',
  CONPLETE_TASK = 'CONPLETE_TASK',
  RESET_TASKS = 'RESET_TASKS',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskActionsModel =
  | {
      type: TaskActions.START_CYCLE;
      payload: TaskModel;
    }
  | {
      type: TaskActions.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActions.CHANGE_SETTINGS;
      payload: TaskStateModel['config'];
    }
  | {
      type: TaskActions.RESET_TASKS;
    }
  | {
      type: TaskActions.INTERRUPT_CYCLE;
    }
  | {
      type: TaskActions.CONPLETE_TASK;
    };
