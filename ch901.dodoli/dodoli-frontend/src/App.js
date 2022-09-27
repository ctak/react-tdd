import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotePage from './pages/NotePage';

const App = () => (
  <Routes>
    <Route element={<NotePage />} path={'/'} />
  </Routes>
)
export default App;
