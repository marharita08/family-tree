import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from ".././family-tree.slice";
import { PersonDto } from "../../../types/person-dto.type";
import { envConfig } from "../../../configs/env.config";
import { fetchJson } from "./helpers/fetch-json.helper";

function* updatePerson(action: ReturnType<typeof actions.updatePersonStart>) {
  try {
    const updatedPerson: PersonDto = yield call(
      fetchJson,
      `${envConfig.apiUrl}persons/${action.payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload.person)
      }
    );
    yield put(actions.updatePersonSuccess(updatedPerson));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    yield put(actions.updatePersonFailure(errorMessage));
  }
}

export function* updatePersonSaga() {
  yield takeLatest(actions.updatePersonStart.type, updatePerson);
}
