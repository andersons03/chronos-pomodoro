import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { MainTemplates } from '../../templates/MainTemplates';
// import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

export const Home = () => {
  usePageTitle('Home');
  return (
    <MainTemplates>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplates>
  );
};
