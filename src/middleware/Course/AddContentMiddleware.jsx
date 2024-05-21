import { CREATE_CONTENT_REQUEST, createContentSuccess, createContentFailure } from "../../action/Course/AddContentAction";
import axios from "axios";
const API_URL = 'http://localhost:5199/lxp/course/material';

const addContent = ({ dispatch }) => (next) => async (action) => {
    if (action.type === CREATE_CONTENT_REQUEST) {
        try {
            console.log("Content posting data : ", action.payload);
            const response =  await axios.post(API_URL, action.payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                dispatch(createContentSuccess(response.data));
                return next(action);
            }
            else {
                console.error("Server Error");
            }
           


            

        }
        catch (error) {
            console.error('API Error:', error.message)
            dispatch(createContentFailure(error.message))
        }
    }
    return next(action);
};

export default addContent;