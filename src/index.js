import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas/index';
import './index.scss';

const mountNode = document.getElementById('root');
const history = createBrowserHistory();

const store = configureStore({}, history);
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  mountNode,
);

registerServiceWorker();
