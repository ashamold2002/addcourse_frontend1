import { UPDATE_TOPIC_REQUEST ,UPDATE_TOPIC_SUCCESS,UPDATE_TOPIC_FAILURE} from "../../action/Course/TopicUpdateAction";


  
  const initialState = {
    
    courses: [],
    loading: false,
    error: null,
    isSuccess:false,
    
    
  };
  
  const UpdateTopicReducer = (state = initialState, action) => {
    switch (action.type) {
       
      case UPDATE_TOPIC_REQUEST:
       
        return{
          ...state,
         // courses:[...state.courses,action.payload],
          loading:true,
          
        };
        case UPDATE_TOPIC_SUCCESS:
        console.log("updatetopic success",action.payload)
        return{
          ...state,
          courses:action.payload,
          loading:false,
          isSuccess:true,
        };
        case UPDATE_TOPIC_FAILURE:
       
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
  
  export default UpdateTopicReducer;
  