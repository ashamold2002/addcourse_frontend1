import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import
import courseReducer from '../../reducer/Course/AddCourseReducer';
import addCourse from '../../middleware/Course/AddCourse';

const rootReducer = combineReducers({
  course: courseReducer, // The key you've used for your course reducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, addCourse) // Corrected middleware application
);

export default store;
