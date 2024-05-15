import axios from 'axios';
import { CREATE_TOPIC_REQUEST, createTopicfailure, createTopicsuccess } from '../../action/Course/TopicContentAction';



const API_URL = 'http://localhost:5199/lxp/course/topic';

 const addTopic = ({ dispatch }) => (next) => async (action) => {
  

  if (action.type === CREATE_TOPIC_REQUEST) {
    try {
      console.log("topic Post api",action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.post(API_URL,action.payload);
      console.log('API Response:', response.data); // Log the response data
      dispatch(createTopicsuccess(response.data.data));
      
      
    } catch (error) {

      console.error('API Error:', error.message);
      dispatch(createTopicfailure(error.message));
      
    }
  }
  return next(action);
  
};

export default addTopic;

