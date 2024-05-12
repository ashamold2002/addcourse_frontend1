// Action Types
export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE';

// Action Creators
export const createCourseRequest = () => ({
  type: CREATE_COURSE_REQUEST,

});

export const createCourseSuccess = (course) => ({
  type: CREATE_COURSE_SUCCESS,
  payload: course,
});

export const createCourseFailure = (error) => ({
  type: CREATE_COURSE_FAILURE,
  payload: error,
});