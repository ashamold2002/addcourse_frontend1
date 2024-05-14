import { FETCH_COURSE_TOPIC } from "../../action/Course/AddTopicAction";
  
  const initialState = {
    
    courses: [],
    loading: false,
    error: null,
    isNavigate:false,
    
  };
  
  const AddTopicReducer = (state = initialState, action) => {
    switch (action.type) {
       
      case FETCH_COURSE_TOPIC:
        console.log("fetchtopic",action.payload)
        return{
          ...state,
          courses:action.payload,
          loading:false,
          isNavigate:true,
        };
  
      
      default:
        return state;
    }
  };
  
  export default AddTopicReducer;
  