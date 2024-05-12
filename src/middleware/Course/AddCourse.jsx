// import { createCourseRequest } from "../../action/Course/AddCourseAction";
// import { createCourseSuccess } from "../../action/Course/AddCourseAction";
// import { createCourseFailure } from "../../action/Course/AddCourseAction";
// // import { createCourseSuccess } from "../../action/Course/AddCourseAction";


// // Thunk Action Creator
// import axios from 'axios';

// export const createCourse = (courseData) => {
//   return async (dispatch) => {
//     dispatch(createCourseRequest());
//     try {
//       const response = await axios.post('http://localhost:5199/lxp/course', courseData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data)
//       dispatch(createCourseSuccess(response.data));
//     } catch (error) {
//       dispatch(createCourseFailure(error.message));
//     }
//   };
// };
// middleware/Course/AddCourse.js

import axios from 'axios';
import {
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure
} from '../../action/Course/AddCourseAction';

export const createCourse = (formData) => {
  return async (dispatch) => {
    dispatch(createCourseRequest());

    try {
      const response = await axios.post('http://localhost:5199/lxp/course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(createCourseSuccess(response.data));
    } catch (error) {
      dispatch(createCourseFailure(error.message));
    }
  };
};