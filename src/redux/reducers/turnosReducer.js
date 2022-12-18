import { turnosTypes } from "../types/turnosTypes";

const initialState = {
  turnos: [],  
};
export const turnosReducer = (state = initialState, action) => {
  switch (action.type) {
    case turnosTypes.GET_TURNOS:
      return {
        ...state,
        turnos: action.payload.turnos,
      };
    default:
      return state;
  }
};