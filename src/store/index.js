import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../reducers/contentReducer";
export const store = configureStore({
  reducer: {
    content: contentReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
});
