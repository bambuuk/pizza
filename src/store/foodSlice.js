import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  foodLoadingStatus: 'idle',
  activeFoodFilter: { name: 'pizza', label: 'ПІЦА' },
  filteredFoodList: []
}

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    foodFetching: state => { state.foodLoadingStatus = 'loading' },
    foodFetched: (state, action) => {
      state.foodLoadingStatus = 'idle';
      state.foodList = action.payload;
      state.filteredFoodList = state.foodList.filter(item => item.productType === state.activeFoodFilter.name);
    },
    foodFetchingError: state => {
      state.foodLoadingStatus = 'error';
    },
    foodChangingActiveFilter: (state, action) => {
      state.activeFoodFilter = action.payload;
      state.filteredFoodList = state.foodList.filter(item => item.productType === state.activeFoodFilter.name);
    }
  }
});

const { actions, reducer } = foodSlice;

export default reducer;
export const {
  foodFetching,
  foodFetched,
  foodFetchingError,
  foodChangingActiveFilter,
} = actions;