import { createSlice } from '@reduxjs/toolkit';

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: 'Loading quote...',
    author: 'Loading author...',
  },
  reducers: {
    newQuote: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const { newQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
