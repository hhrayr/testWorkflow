import * as consts from './consts';

export const loadWorkers = () => {
  return { type: consts.WORKERS_LOAD };
};

export const loadWorkersComplete = (payload) => {
  return {
    type: consts.WORKERS_LOAD_SUCCESS,
    payload,
  };
};

export const loadWorkersError = (payload) => {
  return {
    type: consts.WORKERS_LOAD_ERROR,
    payload,
  };
};

export const runWorkers = () => {
  return { type: consts.WORKERS_RUN };
}
