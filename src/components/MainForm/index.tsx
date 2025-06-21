import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActions } from '../../contexts/TaskContext/TaskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export const MainForm = () => {
  const { taskState, taskDispatch } = useTaskContext();
  const nextCycle = getNextCycle(taskState.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = taskState.tasks[taskState.tasks.length - 1]?.name || '';

  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current!.value.trim();

    if (taskName === '') {
      showMessage.warning('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: taskState.config[nextCycleType],
      type: nextCycleType,
    };
    taskDispatch({ type: TaskActions.START_CYCLE, payload: newTask });
    showMessage.success('Tarefa Iniciada');
  };

  const handleInterruptTask = () => {
    showMessage.error('Ciclo Interrompido');
    taskDispatch({ type: TaskActions.INTERRUPT_CYCLE });
  };

  return (
    <form
      onSubmit={event => handleCreateNewTask(event)}
      action=''
      className='form'
    >
      <div className='formRow'>
        <DefaultInput
          type='text'
          labelText='Task'
          id='task'
          placeholder='Insira uma tarefa'
          ref={taskNameInput}
          disabled={!!taskState.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      {taskState.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      <div className='formRow'>
        {!taskState.activeTask && (
          <DefaultButton
            key={'Começar ciclo'}
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
          />
        )}

        {!!taskState.activeTask && (
          <DefaultButton
            key={'Interroer ciclo'}
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            onClick={() => handleInterruptTask()}
            icon={<StopCircleIcon />}
          />
        )}
      </div>
    </form>
  );
};
