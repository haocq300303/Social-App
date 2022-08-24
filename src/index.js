import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import GlobalStyle from './Components/GlobalStyle';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </Provider>
    </Router>
  </React.StrictMode>
);
