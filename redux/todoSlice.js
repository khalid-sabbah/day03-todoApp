import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
  },
});

export const { actions, reducer } = todoSlice;
export default todoSlice.reducer;
