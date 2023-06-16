import React from "react";
import RecipeSummaryItem from './recipe-summary-item'
import {  useSelector } from "react-redux";


function RecipeSummaryList({_recipes}) {

    const { loading } = useSelector(state => state.recipes)


    return (

        <ul className="list-group">
            {loading ?
                <li className="list-group-item">
                    Loading...
                </li> : _recipes.map(recipe =>
                    <RecipeSummaryItem
                        key={recipe.id} recipe={recipe} />)
            }
        </ul>
    )
}

export default RecipeSummaryList