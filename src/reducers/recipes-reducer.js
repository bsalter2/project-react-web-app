import { createSlice } from "@reduxjs/toolkit";
import {
  findAllRecipesThunk,
  findRecipesByStringThunk,
  findAllRecipesLikedThunk
} from "../services/recipes-thunk";

const initialState = {
  recipes: [],
  loading: false,
};

const RecipesSlice = createSlice({
  name: "recipes",
  initialState,
  extraReducers: {
    [findAllRecipesThunk.pending]: (state) => {
      state.loading = true;
      state.recipes = [];
    },
    [findAllRecipesThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.recipes = payload;
    },
    [findAllRecipesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findAllRecipesLikedThunk.pending]: (state) => {
      state.loading = true;
      state.recipes = [];
    },
    [findAllRecipesLikedThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.recipes = payload;
    },
    [findAllRecipesLikedThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [findRecipesByStringThunk.pending]: (state) => {
      state.loading = true;
      state.recipes = [];
    },
    [findRecipesByStringThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.recipes = payload;
    },
    [findRecipesByStringThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
  reducers: {},
});

export default RecipesSlice.reducer;
