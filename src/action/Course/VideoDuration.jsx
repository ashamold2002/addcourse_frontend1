import { duration } from "@mui/material";

export const SET_VIDEO_DURATION='SET_VIDEO_DURATION';
export const setVideoDuration=(duration)=>({
    type:SET_VIDEO_DURATION,
    payload:duration,
})