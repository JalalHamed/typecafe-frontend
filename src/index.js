import React from "react";
import ReactDOM from "react-dom";

// Libraries
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

// Components
import App from "container/App";
import allReducers from "redux/reducers";
import { setToken } from "requests/Api";
import { setTokenWs } from "requests/ws";

// Designs
import "components/ripple/ripple.scss";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

const middleWare = () => next => action => {
  if (action.type === "TOKENS") {
    // after a successful login, update the token in the API
    setToken(action.payload.ac_t);
    setTokenWs(action.payload.ac_t);
  }

  // continue processing this action
  return next(action);
};

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
      : f => f
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
