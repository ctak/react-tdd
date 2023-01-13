import { Routes, Route } from 'react-router-dom';

import LottoPage from './pages/LottoPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<WelcomePage />} path="/*" />
        <Route element={<LottoPage />} path="/play" />
      </Routes>
    </>
  );
}

export default App;
