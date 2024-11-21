import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "./family-tree.slice";
import { PersonDto } from "../../types/person-dto.type";
import { envConfig } from "../../configs/env.config";

function* fetchFamilyTree() {
  try {
    const response: Response = yield call(
      fetch,
      `${envConfig.apiUrl}persons/family-tree`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch family tree");
    }
    const data: PersonDto[] = yield call([response, response.json]);
    yield put(actions.fetchFamilyTreeSuccess(data));
  } catch (error: unknown) {
    yield put(actions.fetchFamilyTreeFailure((error as Error).message));
  }
}

export function* familyTreeSaga() {
  yield takeLatest(actions.fetchFamilyTreeStart.type, fetchFamilyTree);
}
