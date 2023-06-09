import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    loading: false
}

const template = {
    "_id": 1,
    "name": "Rosemary Foccia",
    "tags": ["bread", "italian"],
    "directions": ["1...", "2...", "3..."],
    "image":"rosemary_foccacia.jpeg",
    "ingredients": ["flour", "oil", "rosemary", "sugar", "salt", "yeast"],
    "difficulty": 4,
    "rating": 7,
    "prep_time": 5,
    "cook_time": 40,
    "serving": "7-10"
}


const tuitsSlice = createSlice({
    name: 'recipes',
    initialState,
    extraReducers: {
        [findRecipeThunk.pending]:
            (state) => {
                state.loading = true
                state.recipes = []
            },
        [findRecipeThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.recipes = payload
            },
        [findRecipeThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            }
    },
    reducers: {}
});

export default tuitsSlice.reducer;
