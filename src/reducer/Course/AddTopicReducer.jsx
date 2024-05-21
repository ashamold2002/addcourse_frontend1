import { 
  CREATE_TOPICS_REQUEST,
  CREATE_TOPICS_SUCCESS,
  CREATE_TOPICS_FAILURE,
} from '../../action/Course/AddTopicAction';

const initialState = {
  topics: [],
  loading: false,
  error: null,
  isSubmitted: false,
};

const addTopicReducer = (state = initialState, action) => {
  switch (action.type) {
      case CREATE_TOPICS_REQUEST:
          return {
              ...state,
              loading: true,
          };
      case CREATE_TOPICS_SUCCESS:

          console.log('Topic posted in Reducer:', action.payload);
          
          // Add the new topic to the existing topics array
          return {
              ...state,
              loading: false,
              topics: action.payload, // Corrected here
              isSubmitted: true,
              error: null,
          };
      case CREATE_TOPICS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export default addTopicReducer;