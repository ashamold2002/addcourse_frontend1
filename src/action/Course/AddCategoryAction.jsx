export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
 
export const createCategoryrequest = (category) => ({
  type:CREATE_CATEGORY_REQUEST ,
  payload:category,
  
});