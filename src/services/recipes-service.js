import axios from "axios";
// const RECIPES_API = process.env.RECIPE_WEB_SERVICE_API;
const RECIPES_API = "https://api.spoonacular.com/recipes/complexSearch";
const SINGLE_RECIPE_API = "https://api.spoonacular.com/recipes/";
const API_KEY = "?apiKey=d159ea975e0240f096bedd37d96044bd";

// const SERVER = "http://localhost:4000"; // used for local
const SERVER = "https://project-node-server-app.onrender.com/";
const BASE_API = `${SERVER}/api/recipes`;

export const findAllRecipes = async () => {
  const QUERY = RECIPES_API + API_KEY;
  const response = await axios.get(QUERY);
  const recipes = response.data.results;
  return recipes;
};

export const findAllRecipesLiked = async () => {
    const response = await axios.get(BASE_API);
    return response.data;
  };

export const findRecipesById = async (id) => {
  const QUERY = SINGLE_RECIPE_API + id + "/information" + API_KEY;
  const response = await axios.get(QUERY);
  const recipe = response.data;
  const QUERY2 = BASE_API + "/recipeId/" + id;
  const response2 = await axios.get(QUERY2);
  if (response2.data) {
    recipe.likes = response2.data.likes;
  } else {
    recipe.likes = 0;
  }
  recipe.recipeId = id;
  recipe.name = response2.data.name;
  return recipe;
};

export const findRecipesByString = async (string) => {
  const QUERY = RECIPES_API + API_KEY + "&query=" + string;
  const response = await axios.get(QUERY);
  const recipes = response.data.results;
  return recipes;
};

export const updateRecipe = async (id, recipe) => {
  const QUERY = BASE_API + "/recipeId/" + id + "/like";
  const response = await axios.put(QUERY, recipe);
  return response.data;
};
