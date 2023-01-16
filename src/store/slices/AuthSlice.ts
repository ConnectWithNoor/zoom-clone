import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  userInfo: {
    uid: string;
    email: string;
    name: string;
  } | null;
  isDarkTheme: boolean;
};
const initialState: InitialStateType = {
  userInfo: null,
  isDarkTheme: false,
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
    switchDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
  },
});

export const { setUser, switchDarkTheme } = authSlice.actions;
