import axios from 'axios';
// const RECIPES_API = process.env.RECIPE_WEB_SERVICE_API;
const RECIPES_API = "https://api.spoonacular.com/recipes/complexSearch"
const SINGLE_RECIPE_API="https://api.spoonacular.com/recipes/"
const API_KEY = "?apiKey=d159ea975e0240f096bedd37d96044bd"

export const findAllRecipes = async () => {
    const QUERY = RECIPES_API + API_KEY
    const response = await axios.get(QUERY);
    const recipes = response.data.results;
    console.log(QUERY)
    return recipes;
}

export const findRecipesById = async (id) => {
    const QUERY = SINGLE_RECIPE_API + id + "/information" + API_KEY
    const response = await axios.get(QUERY);
    const recipe = response.data
    console.log(QUERY)
    return recipe;
}

export const findRecipesByString = async (string) => {
    const QUERY = RECIPES_API + API_KEY + "&query=" + string
    const response = await axios.get(QUERY);
    const recipes = response.data.results;
    console.log(QUERY)
    return recipes;
}

