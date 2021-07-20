import { combineReducers } from 'redux';
import popupReducer from './popup/popup.reducer';
import userReducer from './user/user.reducer';


const rootReducer = combineReducers({
  user:userReducer,
  popup:popupReducer
});

export default rootReducer;