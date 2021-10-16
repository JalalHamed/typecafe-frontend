// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware, Dispatch } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Components
import App from 'container/App';
import allReducers from 'redux/reducers';
import { setToken } from 'requests/api';

// Designs
import 'components/ripple/ripple.scss';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.scss';

interface Action {
  payload: {
    ac_t: string;
    re_t: string;
  };
  type: string;
  ac_t: string;
  re_t: string;
}

const middleWare: Middleware = () => (next: Dispatch) => (action: Action) => {
  if (action.type === 'TOKENS') {
    setToken(action.payload.ac_t, action.payload.re_t);
  }
  return next(action);
};

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(middleWare))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
