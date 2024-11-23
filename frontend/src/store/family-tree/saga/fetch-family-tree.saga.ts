import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from ".././family-tree.slice";
import { PersonDto } from "../../../types/person-dto.type";
import { envConfig } from "../../../configs/env.config";
import { fetchJson } from "./helpers/fetch-json.helper";

function* fetchFamilyTree() {
  try {
    const data: PersonDto[] = yield call(
      fetchJson,
      `${envConfig.apiUrl}persons/family-tree`
    );
    yield put(actions.fetchFamilyTreeSuccess(data));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    yield put(actions.fetchFamilyTreeFailure(errorMessage));
  }
}

export function* familyTreeSaga() {
  yield takeLatest(actions.fetchFamilyTreeStart.type, fetchFamilyTree);
}
