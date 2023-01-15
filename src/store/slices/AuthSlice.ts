import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = object;
const initialState: InitialStateType = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;
