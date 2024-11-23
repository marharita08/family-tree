import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from ".././family-tree.slice";
import { PersonDto } from "../../../types/person-dto.type";
import { envConfig } from "../../../configs/env.config";
import { fetchJson } from "./helpers/fetch-json.helper";

function* addPerson(action: ReturnType<typeof actions.addPersonStart>) {
  try {
    const createdPerson: PersonDto = yield call(
      fetchJson,
      `${envConfig.apiUrl}persons`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload)
      }
    );
    yield put(actions.addPersonSuccess(createdPerson));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    yield put(actions.addPersonFailure(errorMessage));
  }
}

export function* addPersonSaga() {
  yield takeLatest(actions.addPersonStart.type, addPerson);
}
