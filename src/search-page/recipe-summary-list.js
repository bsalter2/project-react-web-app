import React, { useEffect } from "react";
import RecipeSummaryItem from './recipe-summary-item'
import { useDispatch, useSelector } from "react-redux";
import { findAllRecipesThunk } from "../services/recipes-thunk";

function RecipeSummaryList() {
    const { recipes, loading } = useSelector(state => state.recipes)

    return (

        <ul className="list-group">
            {loading ?
                <li className="list-group-item">
                    Loading...
                </li> : recipes.map(recipe =>
                    <RecipeSummaryItem
                        key={recipe.id} recipe={recipe} />)
            }
        </ul>
    )
}

export default RecipeSummaryList