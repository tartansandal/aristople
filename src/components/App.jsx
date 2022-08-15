import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Intro from './Intro';
import ModusPonens from '../features/rules/ModusPonens';
import HypotheticalSyllogism from '../features/rules/HypotheticalSyllogism';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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

export default App;
