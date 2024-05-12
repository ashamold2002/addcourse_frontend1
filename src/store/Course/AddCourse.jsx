import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import courseReducer from '../../reducer/Course/AddCourseReducer';

export const rootReducer = combineReducers({
  // Add other reducers here
  course: courseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
