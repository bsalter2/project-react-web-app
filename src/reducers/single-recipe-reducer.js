import { createSlice } from "@reduxjs/toolkit";
import { findRecipesByIdThunk } from "../services/recipes-thunk";

const initialState = {
    recipe: {},
    loading: false
}

const template = {
    "_id": 1,
    "title": "Rosemary Foccia",
    "tags": ["bread", "italian"],
    "directions": ["1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ],
    "image": "rosemary_foccacia.jpeg",
    "ingredients": ["3 3/4 cups flour", "1/4 cup oil", "3 sprigs rosemary", "2 teaspoons sugar", "2 teaspoons salt", "1 packet active dry yeast"],
    "difficulty": 4,
    "rating": 7,
    "readyInMinutes": 40,
    "serving": "7-10",
    "extendedIngredients": [{
        "original": "1 tbsp butter"
    }]

}


const SingleRecipeSlice = createSlice({
    name: 'single_recipe',
    initialState,
    extraReducers: {
        [findRecipesByIdThunk.pending]:
            (state) => {
                state.loading = true
                state.recipe = {}
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
