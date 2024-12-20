import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducer as familyTreeReducer } from "./family-tree/family-tree.slice";
import {
  familyTreeSaga,
  personsSaga,
  addPersonSaga,
  updatePersonSaga,
  deletePersonSaga
} from "./family-tree/saga/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    familyTree: familyTreeReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(familyTreeSaga);
sagaMiddleware.run(personsSaga);
sagaMiddleware.run(addPersonSaga);
sagaMiddleware.run(updatePersonSaga);
sagaMiddleware.run(deletePersonSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
