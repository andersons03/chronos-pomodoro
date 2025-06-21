import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
  children: React.ReactNode;
};

export const MainTemplates = ({ children }: MainTemplateProps) => {
  return (
    <div className='app'>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </div>
  );
};
