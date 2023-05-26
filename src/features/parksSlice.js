import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const key = 'ldyeZiLsTP3LDvI33Owbysfp9iAoe9F6MIAvU61A';
const baseURL = 'https://developer.nps.gov/api/v1/parks?api_key=';

const initialState = {
  parks: [],
  totalParks: 0,
  totalActivities: 0,
  totalTopics: 0,
  statesData: {},
  stateIsSelected: false,
  activeState: null,
  activeStateData: [],
  initialCall: false,
  isLoading: true,
  selectedStateTotalActivities: 0,
};

export const getParkData = createAsyncThunk('parks/getParkData', async (_, { getState, rejectWithValue }) => {
  const { stateIsSelected, activeState, initialCall } = getState().parkData;

  if (!stateIsSelected && !initialCall) {
    try {
      const response = await fetch(`${baseURL + key}&limit=100`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

  if (activeState && stateIsSelected) {
    try {
      const response = await fetch(`${baseURL + key}&limit=100&q=${activeState}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

  return rejectWithValue('No active state selected');
});

export const calculateTotalActivities = (parks) => {
  let totalActivities = 0;
  parks.forEach((park) => {
    totalActivities += park.activities.length;
  });
  return totalActivities;
};

export const calculateTotalTopics = (parks) => {
  const topicsSet = new Set();
  parks.forEach((park) => {
    park.topics.forEach((topic) => {
      topicsSet.add(topic);
    });
  });
  return topicsSet.size;
};

export const calculateStatesData = (parks) => {
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
  reducers: {
    assignState: (state, action) => {
      const stateCode = action.payload;
      state.activeState = stateCode;
      state.stateIsSelected = true;
    },
    resetState: (state) => {
      state.stateIsSelected = false;
      state.activeState = null;
      state.activeStateData = [];
      state.selectedStateTotalActivities = null;
    },
  },
  extraReducers: {
    [getParkData.pending]: (state) => {
      if (!state.initialCall) {
        state.isLoading = true;
      }
    },
    [getParkData.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (!state.stateIsSelected && !state.initialCall) {
        state.parks = action.payload;
        state.totalParks = action.payload.total;
        state.totalActivities = calculateTotalActivities(action.payload.data);
        state.totalTopics = calculateTotalTopics(action.payload.data);
        state.statesData = calculateStatesData(action.payload.data);
        state.initialCall = true;
      } else {
        let totalActivities = 0;
        state.activeStateData = action.payload;
        state.activeStateData.data.forEach((item) => {
          totalActivities += item.activities.length;
        });
        state.selectedStateTotalActivities = totalActivities;
      }
    },
    [getParkData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { assignState, resetState, setSelectedStateTotalActivities } = parksSlice.actions;
export default parksSlice.reducer;
