import React from 'react'
import RecipeSummaryItem from './recipe_summary_item'

function RecipeSummaryList() {
    const recipes = [{
        "_id": 1,
        "name": "Rosemary Foccia",
        "tags": ["bread", "italian"],
        "directions": ["1...", "2...", "3..."],
        "image": "rosemary_foccacia.jpeg",
        "ingredients": ["flour", "oil", "rosemary", "sugar", "salt", "yeast"],
        "difficulty": 4,
        "rating": 7,
        "prep_time": 5,
        "cook_time": 40,
        "serving": "7-10"
    }]
  return (
    
    <ul className="list-group">
    {
      recipes.map(recipe =>
        <RecipeSummaryItem
          key={recipe._id} recipe={recipe}/> )
    }
  </ul>
  )
}

export default RecipeSummaryList