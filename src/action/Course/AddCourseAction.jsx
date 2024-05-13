export const CREATE_COURSES_REQUEST = 'CREATE_COURSES_REQUEST';
export const CREATE_COURSES_SUCCESS = 'CREATE_COURSES_SUCCESS';
export const CREATE_COURSES_FAILURE = 'CREATE_COURSES_FAILURE';
 
export const createCoursesRequest = (formData) => ({
  type: CREATE_COURSES_REQUEST,
  payload: formData

});
 
export const createCoursesSuccess = (course) => ({
  type: CREATE_COURSES_SUCCESS,
  payload:course
  
});
 
export const createCoursesFailure = (error) => ({
  type: CREATE_COURSES_FAILURE,
  payload: error,
});
 