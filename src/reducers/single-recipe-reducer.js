import { createSlice } from "@reduxjs/toolkit";
import { findRecipesByIdThunk } from "../services/recipes-thunk";

const initialState = {
    recipe: {
        extendedIngredients: [],
        analyzedInstructions: [{
            steps: [{
                number: null,
                step: null
            }]
        }]
    },
    loading: false
}

const SingleRecipeSlice = createSlice({
    name: 'single_recipe',
    initialState,
    extraReducers: {
        [findRecipesByIdThunk.pending]:
            (state) => {
                state.loading = true
                state.recipe = {
                    extendedIngredients: [],
                    analyzedInstructions: [{
                        steps: [{
                            number: null,
                            step: null
                        }]
                    }]
                }
            },
        [findRecipesByIdThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.recipe = payload
            },
        [findRecipesByIdThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            }
    },
    reducers: {}
});

export default SingleRecipeSlice.reducer;
