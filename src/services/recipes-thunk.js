import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./recipes-service";

export const findAllRecipesThunk = createAsyncThunk(
    "recipes/findAllRecipes",
    async () => await service.findAllRecipes()
);

export const findRecipesByIdThunk = createAsyncThunk(
    "recipes/findRecipesById",
    async (id) => await service.findRecipesById(id)
);


