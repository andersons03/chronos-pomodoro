import { Message } from './components/Message';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MainRouter } from './routers/MainRouter';

import './styles/global.css';
import './styles/theme.css';

export const App = () => {
  return (
    <Message>
      <TaskContextProvider>
        <MainRouter />
      </TaskContextProvider>
    </Message>
  );
};
