import { popupActionTypes } from './popup.types';

const INITIAL_STATE = {
  task_toggler: false
};

const popupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case popupActionTypes.ADD_TASKS:
      console.log(!state.task_toggler)
      return {
        task_toggler: !state.task_toggler
      };
    default:
      return state;
  }
};

export default popupReducer;