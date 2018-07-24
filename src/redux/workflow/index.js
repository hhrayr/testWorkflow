import * as consts from './consts';
import initialState from './initialState';

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.WORKERS_LOAD_SUCCESS:
      return {
        ...state,
        workers: action.payload,
      };
    default: return state;
  }
}
