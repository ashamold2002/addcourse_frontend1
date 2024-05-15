import axios from 'axios';
import { UPDATE_TOPIC_REQUEST,updateTopicsuccess,updateTopicfailure } from '../../action/Course/TopicUpdateAction';



const API_URL = 'http://localhost:5199/lxp/course/topic';

 const updateTopic = ({ dispatch }) => (next) => async (action) => {
  

  if (action.type === UPDATE_TOPIC_REQUEST) {
    try {
      console.log("topic PUT api",action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.put(API_URL,action.payload);
      console.log('API Response:', response.data); // Log the response data
      dispatch(updateTopicsuccess(response.data));
      
      
    } catch (error) {

      console.error('API Error:', error.message);
      dispatch(updateTopicfailure(error.message));
      
    }
  }
  return next(action);
  
};

export default updateTopic;

