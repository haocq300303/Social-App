import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App";
import GlobalStyle from "./Components/GlobalStyle";

const container = document.getElementById("root");
const root = createRoot(container);

let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle>
            <App />
          </GlobalStyle>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
