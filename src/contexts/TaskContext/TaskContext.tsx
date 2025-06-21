import { createContext } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { TaskActionsModel } from './TaskActions';

type TaskContextProps = {
  taskState: TaskStateModel;
  taskDispatch: React.Dispatch<TaskActionsModel>;
};

const initialContextValue = {
  taskState: initialTaskState,
  taskDispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
