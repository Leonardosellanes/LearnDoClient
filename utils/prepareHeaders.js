import { getToken } from "./tokenUtils"


export const prepareHeaders = (headers, { getState }) => {
  const token = getToken();
  if (token) {
   // include token in req header
    headers.set('Authorization', `bearer ${token}`)  
    return headers
  } else {
     // public path
     return headers;
  }
}