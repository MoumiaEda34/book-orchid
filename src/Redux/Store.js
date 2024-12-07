import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { Reducer } from "./Reducer"; // Make sure your user reducer is correct
import booksReducer from "./booksSlice"; // Books reducer from the slice
import authReducer from '../features/auth/authSlice';
// Combine reducers (user and books)
const rootReducer = combineReducers({
  user: Reducer,        // Assuming Reducer handles user data
  books: booksReducer,  // Books reducer to manage the book list
  auth: authReducer,
});

// Configure the store with combined reducers and conditional middleware
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      process.env.NODE_ENV !== "production" ? logger : [] // Add redux-logger only in dev mode
    ),
});

export default Store;
