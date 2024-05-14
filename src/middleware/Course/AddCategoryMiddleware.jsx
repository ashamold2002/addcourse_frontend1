import axios from 'axios';
import { CREATE_CATEGORY_REQUEST } from '../../action/Course/AddCategoryAction';



const API_URL = 'http://localhost:5199/lxp/course/category';

 const addCategory = ({ dispatch }) => (next) => async (action) => {
  

  if (action.type === CREATE_CATEGORY_REQUEST) {
    try {
      console.log("category Post api",action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.post(API_URL,action.payload);
      console.log('API Response:', response.data); // Log the response data
      
      
      
    } catch (error) {
      console.error('API Error:', error.message);
      
    }
  }
  return next(action);
  
};

export default addCategory;

