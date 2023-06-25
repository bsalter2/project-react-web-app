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

export const findRecipesByStringThunk = createAsyncThunk(
    "recipes/findRecipesByString",
    async (string) => await service.findRecipesByString(string)
);

export const updateRecipeThunk = createAsyncThunk(
    "recipes/updateRecipe",
    async (recipe) => {
      const status = await service.updateRecipe(recipe.recipeId, recipe);
      return recipe;
    }
  );
