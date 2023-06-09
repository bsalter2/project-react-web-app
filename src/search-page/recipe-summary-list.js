import React from 'react'
import RecipeSummaryItem from './recipe-summary-item'
import RecipeExamples from '../recipe-example.json'

function RecipeSummaryList() {
  return (
    
    <ul className="list-group">
    {
      RecipeExamples.map(recipe =>
        <RecipeSummaryItem
          key={recipe._id} recipe={recipe}/> )
    }
  </ul>
  )
}

export default RecipeSummaryList