import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage for persistence
import { combineReducers } from 'redux';
import userInfoReducer from './userInfoSlice'; // Adjust import path as needed

// Set up redux-persist configuration
const persistConfig = {
  key: 'root',
  storage, // This uses localStorage to persist the state
};

// Combine reducers
const rootReducer = combineReducers({
  userInfo: userInfoReducer, // Add your reducers here
  // Add other reducers as needed
});

// Persist reducer to persist the Redux state
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
const persistor = persistStore(store);

// Define RootState type based on the store
export type RootState = ReturnType<typeof store.getState>; // Infer the root state from the store

export { store, persistor };
