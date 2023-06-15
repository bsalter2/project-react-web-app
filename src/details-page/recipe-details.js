import React from "react"
import "./recipe-details.css"

const RecipeItem = (
    {
        recipe = [{
            "_id": 1,
            "title": "Rosemary Foccia",
            "tags": ["bread", "italian"],
            "analyzedInstructions": [
                {
                    "name": '',
                    "steps": [
                        { "number": 1, "step": "2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                        { "number": 3, "step": "2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                    ]
                }
            ],
            "image": "rosemary_foccacia.jpeg",
            "ingredients": ["3 3/4 cups flour", "1/4 cup oil", "3 sprigs rosemary", "2 teaspoons sugar", "2 teaspoons salt", "1 packet active dry yeast"],
            "difficulty": 4,
            "healthScore": 7,
            "readyInMinutes": 40,
            "serving": "7-10",
            "extendedIngredients": [
                {
                "original": "1 tbsp butter"
                },
                {
                "original": "1 tbsp butter"
                    },
        ]

        }]
    }
) => {
    return (
        <div className="container wd-recipe-details-container">
            <div className="fw-bolder container fs-3">{recipe.title}</div>
            <div className="row align-items-center  wd-recipe-details-sub-heading">
                <div className="col-4">
                    <div className='container fs-6 fst-italic'>Serves: {recipe.servings}</div>
                </div>
                <div className="col-4">
                    <div className='container fs-6 fst-italic'>Cook: {recipe.readyInMinutes} mins</div>
                </div>
                <div className="col-4">
                    <div className='container fs-6 fst-italic' >Health Score: {recipe.healthScore}</div>
                </div>
            </div>
            <div className="row align-items-center wd-recipe-details-section">
                <div className="col-6">
                    <div className="fs-5">Ingredients</div>
                    {recipe.extendedIngredients.map((ingredient) =>
                        <div className="container wd-recipe-details-ingredients"> {ingredient.original}</div>
                    )}
                </div>
                <div className="col-6">
                    <img height={200} width={200} src={recipe.image} alt="" />
                </div>
            </div>
            <div className="fs-5 ">Directions</div>
            {recipe.analyzedInstructions[0].steps.map((direction) =>
                <div className="container wd-recipe-details"> {direction.number}. {direction.step}</div>
            )}
        </div> 
    )
}

export default RecipeItem