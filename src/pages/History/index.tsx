import { Trash2 } from 'lucide-react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplates } from '../../templates/MainTemplates';
import { DefaultButton } from '../../components/DefaultButton';
// import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus ';
import { useEffect, useState } from 'react';
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../adapters/showMessage';
import { TaskActions } from '../../contexts/TaskContext/TaskActions';
import { usePageTitle } from '../../hooks/usePageTitle';

export const History = () => {
  const { taskState, taskDispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: taskState.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );
  const hasTasks = taskState.tasks.length > 0;

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        tasks: sortTaskOptions.tasks,
        direction: newDirection,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleClearHistory() {
    showMessage.confirm(
      'Deseja excluir o historico de tarefas?',
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  const taskTypeDictionary = {
    workTime: 'Foco',
    shortBreakTime: 'Descanço curto',
    longBreakTime: 'Descanço longo',
  };

  usePageTitle('Historico');

  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: taskState.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [taskState.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;
    taskDispatch({ type: TaskActions.RESET_TASKS });
    setConfirmClearHistory(false);
  }, [confirmClearHistory, taskDispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  return (
    <MainTemplates>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Heading>Historico</Heading>
          <div className={styles.buttonContainer}>
            {hasTasks && (
              <DefaultButton
                color='red'
                icon={<Trash2 />}
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleClearHistory}
              />
            )}
          </div>
        </div>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          {hasTasks && (
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    Tarefa ↕️
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    Duração ↕️
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    Data ↕️
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, taskState.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!hasTasks && (
            <p style={{ textAlign: 'center' }}>Nenhuma tarefa criada!</p>
          )}
        </div>
      </Container>
    </MainTemplates>
  );
};
