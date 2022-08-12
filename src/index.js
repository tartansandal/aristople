import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './components/Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModusPonens from './features/rules/ModusPonens';
import HypotheticalSyllogism from './features/rules/HypotheticalSyllogism';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/aristople" element={<App />}>
            <Route
              path="hypothetical-syllogism"
              element={<HypotheticalSyllogism />}
            />
            <Route path="modus-ponens" element={<ModusPonens />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
