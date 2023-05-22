import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const key = 'ldyeZiLsTP3LDvI33Owbysfp9iAoe9F6MIAvU61A';
const baseURL = 'https://developer.nps.gov/api/v1/parks?api_key=';

const initialState = {
  parks: [],
  totalParks: 0,
  isLoading: true,
};

export const getParkData = createAsyncThunk('cart/getCartItems', () => fetch(baseURL + key)
  .then((resp) => resp.json())
  .catch((err) => console.log(err))); // eslint-disable-line no-console

const parksSlice = createSlice({
  name: 'parks',
  initialState,
  extraReducers: {
    [getParkData.pending]: (state) => {
      state.isLoading = true;
    },
    [getParkData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.parks = action.payload;
      state.totalParks = action.payload.total;
    },
    [getParkData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default parksSlice.reducer;
