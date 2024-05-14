import { 
  CREATE_COURSES_REQUEST,
  CREATE_COURSES_SUCCESS,
  CREATE_COURSES_FAILURE,
  CREATE_CONTENT,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from '../../action/Course/AddCourseAction';

const initialState = {
  
  courses: [],
  loading: false,
  error: null,
  isSubmitted:false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
     case CREATE_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COURSES_SUCCESS:
      console.log('Course posted:', action.payload);
      
      // Add the new course to the existing courses array
      return {
        ...state,
        loading: false,
        courses: [...state.courses, action.payload],
        isSubmitted:true,
        error: null,
      };
     
    case CREATE_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default courseReducer;
