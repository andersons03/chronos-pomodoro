import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { loadBeep } from '../../utils/loadBeep';
import { TaskActions } from './TaskActions';
import { showMessage } from '../../adapters/showMessage';

type TaskStateProviderProps = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskStateProviderProps) => {
  const [taskState, taskDispatch] = useReducer(
    taskReducer,
    initialTaskState,
    () => {
      const storageState = localStorage.getItem('state');
      if (storageState === null) return initialTaskState;
      const parsedStorageState = JSON.parse(storageState);
      return {
        ...parsedStorageState,
        activeTask: null,
        secondsRemaing: 0,
        formattedSecondsRemaing: '00:00',
      };
    },
  );
  const playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;
    // console.log(Math.floor(countDownSeconds / 60), ':', countDownSeconds % 60);

    if (countDownSeconds <= 0) {
      taskDispatch({ type: TaskActions.CONPLETE_TASK });
      showMessage.dismiss();
      showMessage.success('Ciclo Concluido');
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      worker.terminate();
    } else {
      taskDispatch({
        type: TaskActions.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    // console.log(taskState);
    localStorage.setItem('state', JSON.stringify(taskState));

    if (!taskState.activeTask) {
      worker.terminate();
    }

    if (taskState.activeTask) {
      document.title = `${taskState.formattedSecondsRemaing} (${taskState.activeTask.name}) - Chronos Pomodoro`;
    }

    worker.postMessage(taskState);
  }, [worker, taskState]);

  useEffect(() => {
    if (taskState.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    }
  }, [taskState.activeTask]);

  return (
    <TaskContext.Provider value={{ taskState, taskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
