import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import
import courseReducer from '../../reducer/Course/AddCourseReducer';
import addCourse from '../../middleware/Course/AddCourse';
import fetchcategoryApi from '../../middleware/Course/FetchCategoryMiddleware';
import fetchlevelApi from '../../middleware/Course/FetchLevelMiddleware';
import fetchCategoryReducer from '../../reducer/Course/FetchCategoryReducer';
import fetchLevelReducer from '../../reducer/Course/FetchLevelReducer';
import AddTopicReducer from '../../reducer/Course/AddTopicReducer';

const rootReducer = combineReducers({
  course: courseReducer, // The key you've used for your course reducer
  level:fetchLevelReducer,
  category:fetchCategoryReducer,
  addtopic:AddTopicReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, addCourse,fetchcategoryApi,fetchlevelApi) // Corrected middleware application
);

export default store;
