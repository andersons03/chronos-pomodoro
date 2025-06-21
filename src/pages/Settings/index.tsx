import { Heading } from '../../components/Heading';
import { Container } from '../../components/Container';
import { MainTemplates } from '../../templates/MainTemplates';
import { DefaultInput } from '../../components/DefaultInput';
import { DefaultButton } from '../../components/DefaultButton';
import { SaveIcon } from 'lucide-react';
import { useRef } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActions } from '../../contexts/TaskContext/TaskActions';
import { usePageTitle } from '../../hooks/usePageTitle';
// import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

export const Settings = () => {
  const worktimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);
  const { taskState, taskDispatch } = useTaskContext();
  usePageTitle('Configurações');

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workTime = Number(worktimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);
    const formErros = [];

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErros.push('Digite apenas numeros');
    }

    if (workTime < 1 || workTime > 60) {
      formErros.push('Apenas valores entre 1 e 60 para foco');
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErros.push('Apenas valores entre 1 e 30 para Descanço curto');
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErros.push('Apenas valores entre 1 e 60 para Descanço longo');
    }

    if (formErros.length > 0) {
      formErros.forEach(erro => {
        showMessage.error(erro);
      });
      return;
    }

    taskDispatch({
      type: TaskActions.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    showMessage.success('Configurações Salvas');
  };

  return (
    <MainTemplates>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>
      <Container>
        <form
          action=''
          className='form'
          onSubmit={e => {
            handleSaveSettings(e);
          }}
        >
          <div className='formRow'>
            <DefaultInput
              type='number'
              id='worktime'
              labelText='Foco'
              ref={worktimeInput}
              defaultValue={taskState.config.workTime}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              type='number'
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={taskState.config.shortBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              type='number'
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={taskState.config.longBreakTime}
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar Configurações'
              title='Salvar Configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplates>
  );
};
