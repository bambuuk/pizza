import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  foodLoadingStatus: 'idle',
}

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    foodFetching: state => { state.foodLoadingStatus = 'loading' },
    foodFetched: (state, action) => {
      state.foodLoadingStatus = 'idle';
      state.foodList = action.payload;
    },
    foodFetchingError: state => {
      state.foodLoadingStatus = 'error';
    }
  }
});

const { actions, reducer } = foodSlice;

export default reducer;
export const {
  foodFetching,
  foodFetched,
  foodFetchingError,
} = actions;