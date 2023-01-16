import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  userInfo: {
    uid: string;
    email: string;
    name: string;
  } | null;
};
const initialState: InitialStateType = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: {
        payload: InitialStateType['userInfo'];
        type: string;
      }
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
