import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingState {
  status: 'online' | 'offline'
};

export type BudgetAction = PayloadAction<Partial<SettingState>>;

const initialState: SettingState = {
  status: 'online'
 };

export type SetStatusAction = PayloadAction<'online' | 'offline'>

const slice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setStatus(state, { payload }: SetStatusAction) {
      state.status = payload
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setStatus
} = slice.actions;