import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import Intro from './Intro';
import ModusPonens from '../features/rules/ModusPonens';
import HypotheticalSyllogism from '../features/rules/HypotheticalSyllogism';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Intro />} />
        <Route
          path="hypothetical-syllogism"
          element={<HypotheticalSyllogism />}
        />
        <Route path="modus-ponens" element={<ModusPonens />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
