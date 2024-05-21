export const CREATE_CONTENT_REQUEST ='CREATE_CONTENT_REQUEST';
export const CREATE_CONTENT_SUCCESS = 'CREATE_CONTENT_SUCCESS';
export const CREATE_CONTENT_FAILURE = 'CREATE_CONTENT_FAILURE';

export const createContentRequest=(formData)=>({
    type: CREATE_CONTENT_REQUEST,
    payload : formData
})

export const createContentSuccess=(content)=>({
    type: CREATE_CONTENT_SUCCESS,
    payload : content
})

export const createContentFailure = (error)=>({
    type: CREATE_CONTENT_FAILURE,
    payload : error
})

