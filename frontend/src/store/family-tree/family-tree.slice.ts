import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonDto } from "../../types/person-dto.type";

interface FamilyTreeState {
  tree: PersonDto[] | null;
  loading: boolean;
  error: string | null;
  openNodes: string[];
}

const initialState: FamilyTreeState = {
  tree: null,
  loading: false,
  error: null,
  openNodes: []
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
    }
  }
});

export { reducer, actions };
