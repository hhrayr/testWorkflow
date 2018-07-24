import { put, takeEvery, select } from 'redux-saga/effects';
import * as workflowActions from '../redux/workflow/actions';
import * as workflowConsts from '../redux/workflow/consts';
import Worker from '../flowEngine/worker';

function* watchLoadWorkers() {
  yield takeEvery(workflowConsts.WORKERS_LOAD, loadWorkersAsync);
}

function* loadWorkersAsync(action) {
  try {
    const worker = new Worker();
    worker.setupFromStaticSamples();
    yield put(workflowActions.loadWorkersComplete(worker.getWorkers()));
  } catch (err) {
    yield put(workflowActions.loadWorkersError(err));
  }
}

function* watchRunWorkers() {
  yield takeEvery(workflowConsts.WORKERS_RUN, runWorkersAsync);
}

const selectWorkers = state => state.workflow.workers;

function* runWorkersAsync(action) {
  try {
    const workers = yield select(selectWorkers);
    const worker = new Worker();
    worker.addWorkers(workers);
    worker.buildWorkerTree();
    worker.runWorkerTree();
    yield put(workflowActions.loadWorkersComplete(worker.getWorkers()));
  } catch (err) {
    yield put(workflowActions.loadWorkersError(err));
  }
}

export default [
  watchLoadWorkers(),
  watchRunWorkers(),
];
