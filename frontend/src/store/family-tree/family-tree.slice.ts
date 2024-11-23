import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonDto } from "../../types/person-dto.type";
import { PersonCreateDto } from "../../types/person-create-dto.type";

interface FamilyTreeState {
  tree: PersonDto[] | null;
  loading: boolean;
  error: string | null;
  openNodes: string[];
  person: PersonCreateDto | null;
  persons: PersonDto[] | null;
}

const initialState: FamilyTreeState = {
  tree: null,
  loading: false,
  error: null,
  openNodes: [],
  person: null,
  persons: null
};

const { reducer, actions } = createSlice({
  name: "familyTree",
  initialState,
  reducers: {
    fetchFamilyTreeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFamilyTreeSuccess(state, action: PayloadAction<PersonDto[]>) {
      state.tree = action.payload;
      state.loading = false;
    },
    fetchFamilyTreeFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleNode(state, action: PayloadAction<string>) {
      const nodeId = action.payload;
      if (state.openNodes.includes(nodeId)) {
        state.openNodes = state.openNodes.filter(id => id !== nodeId);
      } else {
        state.openNodes.push(nodeId);
      }
    },
    addPersonStart(state, action: PayloadAction<PersonCreateDto>) {
      state.loading = true;
      state.error = null;
      state.person = action.payload;
    },
    addPersonSuccess(state, action: PayloadAction<PersonDto>) {
      state.loading = false;
      const person = state.person as PersonCreateDto;
      if (!state.tree) {
        state.tree = [];
      }
      if (!person.parent1Id && !person.parent2Id) {
        state.tree.push(action.payload);
        state.tree.sort();
      }

      function addChild(parentId: number) {
        function searchParent(per: PersonDto, parentId: number) {
          if (+per.id === +parentId) {
            if (!per.children) {
              per.children = [];
            }
            per.children.push(action.payload);
          } else if (per.children) {
            per.children.forEach(child => searchParent(child, parentId));
          }
        }

        state.tree?.forEach(per => searchParent(per, parentId));
      }
      if (person.parent1Id) {
        addChild(person.parent1Id);
      }
      if (person.parent2Id) {
        addChild(person.parent2Id);
      }
    },
    addPersonFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPersonsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPersonsSuccess(state, action: PayloadAction<PersonDto[]>) {
      state.persons = action.payload;
      state.loading = false;
    },
    fetchPersonsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export { reducer, actions };
