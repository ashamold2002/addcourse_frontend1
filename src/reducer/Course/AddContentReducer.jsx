import { 
    CREATE_CONTENT_REQUEST,
    CREATE_CONTENT_SUCCESS,
    CREATE_CONTENT_FAILURE,
    
    
  } from '../../action/Course/AddContentAction';
  
  const initialState = {
    
    content: [],
    loading: false,
    error: null,
    isSubmitted:false,
  };
  
  const AddMaterialReducer = (state = initialState, action) => {
    switch (action.type) {
       case CREATE_CONTENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CONTENT_SUCCESS:
        console.log('Content posted1:', action.payload);
        
        // Add the new course to the existing courses array
        return {
          ...state,
          loading: false,
          content: action.payload,
          isSubmitted:true,
          error: null,
        };
       
      case CREATE_CONTENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default AddMaterialReducer;
  