
import { SET_HARBOURS } from './actions';
import initialState from './state';

export default function(state = initialState, action) {
  switch (action.type) {
      case SET_HARBOURS: {
          return {
            ...state,
            harbors: {
              ...state.harbors,
              [action.payload.harborType]: action.payload.harbors
            }
          }
      }
      default:
          return state;
  }
}
