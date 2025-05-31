import createSagaMiddleware from "redux-saga";
import createReducerManager from "./reducermanager";
import createSagaManager from "./sagamanager";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const initialState = {};
const reducerManager = createReducerManager(initialState);

const store = configureStore({
  reducer: reducerManager.reduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
  preloadedState: initialState,
});

let sagaManager = createSagaManager(sagaMiddleware);

sagaManager.setAddSagaListener((saga) => {
  sagaMiddleware.run(saga);
});

store.reducerManager = reducerManager;
store.sagaManager = sagaManager;

export default store;
