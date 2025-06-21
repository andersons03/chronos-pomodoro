import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { NotFound } from '../pages/NotFound';
import { AboutPomodoro } from '../pages/AboutPomodoro';
import { Home } from '../pages/Home';
import { useEffect } from 'react';
import { History } from '../pages/History';
import { Settings } from '../pages/Settings';

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sobre' element={<AboutPomodoro />} />
        <Route path='/historico' element={<History />} />
        <Route path='/configuracoes' element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollTop />
    </BrowserRouter>
  );
};
