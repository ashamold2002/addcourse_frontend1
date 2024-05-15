import axios from 'axios';
import { DELETE_TOPIC_REQUEST,deleteTopicsuccess,deleteTopicfailure } from '../../action/Course/TopicDeleteAction';



const API_URL = 'http://localhost:5199/lxp/course/topic';

 const deleteTopic = ({ dispatch }) => (next) => async (action) => {
  

  if (action.type === DELETE_TOPIC_REQUEST) {
    try {
      console.log("topic delete api",action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.delete(`API_URL/${action.payload}`);
      console.log('API Response:', response.data); // Log the response data
      dispatch(deleteTopicsuccess(response.data));
      
      
    } catch (error) {

      console.error('API Error:', error.message);
      dispatch(deleteTopicfailure(error.message));
      
    }
  }
  return next(action);
  
};

export default deleteTopic;

