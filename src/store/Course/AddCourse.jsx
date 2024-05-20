import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import
import courseReducer from '../../reducer/Course/AddCourseReducer';
import addCourse from '../../middleware/Course/AddCourse';
import fetchcategoryApi from '../../middleware/Course/FetchCategoryMiddleware';
import fetchlevelApi from '../../middleware/Course/FetchLevelMiddleware';
import fetchCategoryReducer from '../../reducer/Course/FetchCategoryReducer';
import fetchLevelReducer from '../../reducer/Course/FetchLevelReducer';
import AddTopicReducer from '../../reducer/Course/AddTopicReducer';
import categoryReducer from '../../reducer/Course/AddCategoryReducer';
import addCategory from '../../middleware/Course/AddCategoryMiddleware';
import AddTopicContentReducer from '../../reducer/Course/AddTopicContentReducer';
import UpdateTopicReducer from '../../reducer/Course/UpdateTopicReducer';
import DeleteTopicReducer from '../../reducer/Course/DeleteTopicReducer';
import addTopic from '../../middleware/Course/AddTopicMiddleware';
import updateTopic from '../../middleware/Course/UpdateTopicMiddleware';
import deleteTopic from '../../middleware/Course/DeleteTopicMiddleware';
import fetchCourseReducer from '../../reducer/Course/FetchCourseDetailReducer';
import fetchcourseApi from '../../middleware/Course/FetchCourseDetailMiddleware';

const rootReducer = combineReducers({
  course: courseReducer, // The key you've used for your course reducer
  level:fetchLevelReducer,
  category:fetchCategoryReducer,
  addtopic:AddTopicReducer,
  addCategory:categoryReducer,
  addtopicContent:AddTopicContentReducer,
  updateTopic:UpdateTopicReducer,
  deleteTopic:DeleteTopicReducer,
  fetchCourse:fetchCourseReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, addCourse,addCategory,addTopic,updateTopic,deleteTopic,fetchcategoryApi,fetchlevelApi,fetchcourseApi) // Corrected middleware application
);

export default store;
