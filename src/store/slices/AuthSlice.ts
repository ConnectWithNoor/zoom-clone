import { createSlice } from '@reduxjs/toolkit/dist/createSlice';

type InitialStateType = object;
const initialState: InitialStateType = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;
