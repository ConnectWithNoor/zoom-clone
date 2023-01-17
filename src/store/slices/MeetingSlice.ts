import { createSlice } from '@reduxjs/toolkit';
import { ToastType } from '../../utils/types';

type MeetingInitialStateType = {
  toasts: ToastType[];
};

const initialState: MeetingInitialStateType = {
  toasts: [],
};

export const meetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    setToasts: (state, action) => {
      state.toasts = action.payload;
    },
  },
});

export const { setToasts } = meetingSlice.actions;
