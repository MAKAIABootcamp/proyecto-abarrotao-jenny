import { configureStore } from "@reduxjs/toolkit";
import { glocersReducer } from "../reducers/glocersReducer";
import { turnosReducer } from "../reducers/turnosReducer";
import { userReducer } from "../reducers/userReducer";
const reducer = {
  userStore: userReducer, 
  glocerStore: glocersReducer,
  turnoStore: turnosReducer, 
};
const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
