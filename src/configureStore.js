import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import reducers from './redux';

const configureStore = (preloadedState, history) => {
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const sagaMiddleware = createSagaMiddleware();
  
  const store = createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
      ...enhancers
    )
  );

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store;
};

export default configureStore;
