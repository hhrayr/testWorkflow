import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import workflow from './workflow';

export default combineReducers({
  router,
  workflow,
});
