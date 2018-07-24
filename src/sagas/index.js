import { all } from 'redux-saga/effects';
import workflowWatchers from './workflow';

export default function* rootSaga() {
  yield all([]
    .concat(workflowWatchers)
  )
};
