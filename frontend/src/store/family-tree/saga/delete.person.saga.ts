import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from ".././family-tree.slice";
import { envConfig } from "../../../configs/env.config";
import { fetchJson } from "./helpers/fetch-json.helper";

function* deletePerson(action: ReturnType<typeof actions.deletePersonStart>) {
  try {
    yield call(fetchJson, `${envConfig.apiUrl}persons/${action.payload}`, {
      method: "DELETE"
    });
    yield put(actions.deletePersonSuccess());
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    yield put(actions.deletePersonFailure(errorMessage));
  }
}

export function* deletePersonSaga() {
  yield takeLatest(actions.deletePersonStart.type, deletePerson);
}
