import axios from 'axios';
// const RECIPES_API = process.env.RECIPE_WEB_SERVICE_API;
const RECIPES_API = "https://api.spoonacular.com/recipes/complexSearch?apiKey=d159ea975e0240f096bedd37d96044bd"
const SINGLE_RECIPE_API="https://api.spoonacular.com/recipes/"
const API_KEY = "?apiKey=d159ea975e0240f096bedd37d96044bd"

export const findAllRecipes = async () => {
    const response = await axios.get(RECIPES_API);
    const recipes = response.data.results;
    console.log(recipes)
    return recipes;
}

export const findRecipesById = async (id) => {
    const QUERY = SINGLE_RECIPE_API + id + "/information" + API_KEY
    const response = await axios.get(QUERY);
    const recipe = response.data
    console.log(recipe)
    return recipe;
}

