import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const key = 'ldyeZiLsTP3LDvI33Owbysfp9iAoe9F6MIAvU61A';
const baseURL = 'https://developer.nps.gov/api/v1/parks?api_key=';

const initialState = {
  parks: [],
  totalParks: 0,
  totalActivities: 0,
  totalTopics: 0,
  statesData: {},
  isLoading: true,
};

export const getParkData = createAsyncThunk('cart/getCartItems', () => fetch(`${baseURL + key}&limit=200`)
  .then((resp) => resp.json())
  .catch((err) => console.log(err))); // eslint-disable-line no-console

const calculateTotalActivities = (parks) => {
  let totalActivities = 0;
  parks.forEach((park) => {
    totalActivities += park.activities.length;
  });
  return totalActivities;
};

const calculateTotalTopics = (parks) => {
  const topicsSet = new Set();
  parks.forEach((park) => {
    park.topics.forEach((topic) => {
      topicsSet.add(topic);
    });
  });
  return topicsSet.size;
};

const calculateStatesData = (parks) => {
  const statesData = {};
  let id = 1; // Counter variable for generating IDs
  parks.forEach((park) => {
    const { stateCode } = park.addresses[0];
    if (statesData[stateCode]) {
      statesData[stateCode].totalParks += 1;
      statesData[stateCode].totalActivities += park.activities.length;
      statesData[stateCode].totalTopics += park.topics.length;
    } else {
      statesData[stateCode] = {
        id: id += 1, // Generate ID and increment the counter
        stateCode,
        totalParks: 1,
        totalActivities: park.activities.length,
        totalTopics: park.topics.length,
      };
    }
  });
  return statesData;
};

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
      state.totalActivities = calculateTotalActivities(action.payload.data);
      state.totalTopics = calculateTotalTopics(action.payload.data);
      state.statesData = calculateStatesData(action.payload.data);
    },
    [getParkData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default parksSlice.reducer;
