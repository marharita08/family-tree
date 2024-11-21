import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducer as familyTreeReducer } from "./family-tree/family-tree.slice";
import { familyTreeSaga } from "./family-tree/family-tree.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    familyTree: familyTreeReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(familyTreeSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
