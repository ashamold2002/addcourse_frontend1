import { SET_VIDEO_DURATION } from "../../action/Course/VideoDuration";

const initialstate={
    videoDuration:0,
};

const videoReducer=(state=initialstate,action)=>{
    switch(action.type){
        case SET_VIDEO_DURATION:{
            return{
                ...state,
                videoDuration:action.payload,
            };
        }
        default:
            return state;
    }
};
export default videoReducer;