import { createSlice } from "@reduxjs/toolkit";
import { findAllRecipesThunk, findRecipesByStringThunk } from "../services/recipes-thunk";

const initialState = {
    recipes: [],
    loading: false
}

const RecipesSlice = createSlice({
    name: 'recipes',
    initialState,
    extraReducers: {
        [findAllRecipesThunk.pending]:
            (state) => {
                state.loading = true
                state.recipes = []
            },
        [findAllRecipesThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.recipes = payload
            },
        [findAllRecipesThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [findRecipesByStringThunk.pending]:
            (state) => {
                state.loading = true
                state.recipes = []
            },
        [findRecipesByStringThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.recipes = payload
            },
        [findRecipesByStringThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            }
    },
    reducers: {}
});

export default RecipesSlice.reducer;
