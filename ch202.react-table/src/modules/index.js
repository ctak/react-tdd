import { combineReducers } from 'redux';
import pharmacies from './pharmacies';

const rootReducer = combineReducers({
  pharmacies,
});

export default rootReducer;
