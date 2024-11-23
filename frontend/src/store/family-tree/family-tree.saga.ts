import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "./family-tree.slice";
import { PersonDto } from "../../types/person-dto.type";
import { envConfig } from "../../configs/env.config";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return null as unknown as T;
}

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
