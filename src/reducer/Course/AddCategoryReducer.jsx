import { CREATE_CATEGORY_REQUEST } from "../../action/Course/AddCategoryAction";
  
  const initialState = {
    
    category: [],
    loading: false,
    error: null,
    
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
       case CREATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  