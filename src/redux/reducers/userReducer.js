import { userTypes } from "../types/userTypes";
const initialState = {
  user: {},  
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_SIGNPHONE:
      return {
        ...action.payload.user,
      };
    case userTypes.USER_AUTHENTICATION:
      return {
        ...state,
        authentication: true,
      };
    case userTypes.USER_REGISTER:
      return {
        ...state,
        ...action.payload.user,
      };

    case userTypes.USER_LOGIN:
      return {
        ...state,
        ...action.payload.user,
      };
      case userTypes.USER_LOGOUT:
        return{
            
        }

    default:
      return state;
  }
};
