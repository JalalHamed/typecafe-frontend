import React from "react";
import ReactDOM from "react-dom";

// Libraries
import { createStore } from "redux";
import { Provider } from "react-redux";

// Components
import App from "container/App";
import allReducers from "redux/reducers";

// Designs
import "components/ripple/ripple.scss";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
