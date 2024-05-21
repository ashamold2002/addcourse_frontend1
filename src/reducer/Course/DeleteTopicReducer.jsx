import { DELETE_TOPIC_REQUEST,DELETE_TOPIC_SUCCESS,DELETE_TOPIC_FAILURE } from "../../action/Course/TopicDeleteAction";


  
  const initialState = {
    
    courses: [],
    loading: false,
    error: null,
    isSuccess:false,
    
    
  };
  
  const DeleteTopicReducer = (state = initialState, action) => {
    switch (action.type) {
       
      case DELETE_TOPIC_REQUEST:
       
        return{
          ...state,
          // courses:[...state.courses,action.payload],
          loading:true,
          
        };
        case DELETE_TOPIC_SUCCESS:
        console.log("deletetopic success",action.payload)
        return{
          ...state,
          courses:action.payload,
          loading:false,
          isSuccess:true,
        };
        case DELETE_TOPIC_FAILURE:
       
        return{
          ...state,
          courses:action.payload,
          loading:false,
          error:action.payload,
        };
  
      
      default:
        return state;
    }
  };
  
  export default DeleteTopicReducer;
  