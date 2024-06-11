import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import persistReducer from 'redux-persist/es/persistReducer';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage";
import taskReducer from "./state";
import authReducer from './state/authSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const persistConfig = { key: "root", storage, version: 1, };
// Combine all your reducers
const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
  // Add more reducers if needed
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
            <App />
          </StyleSheetManager>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>
);