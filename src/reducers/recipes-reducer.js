import { createSlice } from "@reduxjs/toolkit";
import { findAllRecipesThunk, findRecipesByStringThunk } from "../services/recipes-thunk";

const initialState = {
    recipes: [],
    loading: false
}

const template = {
    "_id": 1,
    "name": "Rosemary Foccia",
    "tags": ["bread", "italian"],
    "directions": ["1...", "2...", "3..."],
    "image": "rosemary_foccacia.jpeg",
    "ingredients": ["flour", "oil", "rosemary", "sugar", "salt", "yeast"],
    "difficulty": 4,
    "rating": 7,
    "prep_time": 5,
    "cook_time": 40,
    "serving": "7-10"
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
