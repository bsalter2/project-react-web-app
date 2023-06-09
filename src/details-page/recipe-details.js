import React from "react"
import "./recipe-details.css"

const RecipeItem = (
    {
        recipe = {
            "_id": 1,
            "name": "Rosemary Foccia",
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
            "prep_time": 5,
            "cook_time": 40,
            "serving": "7-10"

        }
    }
) => {
    return (
        <div className="container wd-recipe-details-container">
            <div className="fw-bolder container fs-3">{recipe.name}</div>
            <div className="row align-items-center  wd-recipe-details-sub-heading">
                <div className="col-4">
                    <div className='container fs-5'>Serves: {recipe.serving}</div>
                </div>
                <div className="col-4">
                    <div className='container fs-5'>Prep: {recipe.prep_time} mins</div>
                </div>
                <div className="col-4">
                    <div className='container fs-5'>Cook: {recipe.cook_time} mins</div>
                </div>
            </div>
            <div className="row align-items-center wd-recipe-details-section">
                <div className="col-6">
                <div className="fs-5">Ingredients</div>
                    {recipe.ingredients.map((ingredient) =>
                        <div className="container wd-recipe-details-ingredients"> {ingredient}</div>
                    )}                </div>
                <div className="col-6">
                    <img height={200} width={200} src={require(`../images/${recipe.image}`)} alt="" />
                </div>
            </div>
            <div className="fs-5 ">Directions</div>
                    {recipe.directions.map((direction) =>
                        <div className="container wd-recipe-details"> {direction}</div>
                    )}
            <div className='fst-italic wd-recipe-details'>Tags: {recipe.tags.join(", ")}</div>
        </div>
    )
}

export default RecipeItem