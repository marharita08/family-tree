import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from ".././family-tree.slice";
import { PersonDto } from "../../../types/person-dto.type";
import { envConfig } from "../../../configs/env.config";
import { fetchJson } from "./helpers/fetch-json.helper";

function* fetchPersons() {
  try {
    const data: PersonDto[] = yield call(
      fetchJson,
      `${envConfig.apiUrl}persons`
    );
    yield put(actions.fetchPersonsSuccess(data));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    yield put(actions.fetchPersonsFailure(errorMessage));
  }
}

export function* personsSaga() {
  yield takeLatest(actions.fetchPersonsStart.type, fetchPersons);
}
