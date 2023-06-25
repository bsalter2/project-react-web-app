import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { updateRecipeThunk } from "../services/recipes-thunk";
import { updateUserThunk } from "../services/users-thunk";

const Container = styled.div`
  position: relative;
`;

const RecipeContainer = styled.div`
  border: 2px solid white;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  background-color: #15202b;
  color: white;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #15202b;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  border: 2px solid white;

  &:hover {
    background-color: #1DA1F2;
  }
`;

const Likes = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const RecipeImage = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 150px;
  width: 150px;
  border-radius: 15%;
  margin-top: 110px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 15px;
  margin-top: 40px;
  position: relative;
  padding-bottom: 0.2em; /* control vertical space for underline */

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;  /* Adjust this to control the vertical position of the underline */
    width: 100%;
    height: 2px; /* control thickness of underline */
    background: currentColor;
  }
`;

const RecipeDetail = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const RecipeItem = ({
  recipe = [{
    "_id": 1,
    "likes": 0,
    "recipeId": 123,
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
}) => {
  const [_recipe, setRecipe] = useState(recipe);
  const { currentUser } = useSelector(state => state.currentUser)

  const [profile, setProfile] = useState(currentUser);

  console.log(profile)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const protectedMethod = () => {
    if (profile) {
      const isLiked = profile.likes.some((id) =>
        id.recipeId === recipe.recipeId
      )
      return isLiked
    } else {
      return false
    }
  }

  const handleLike = async () => {
    let updatedRecipe = {}
    let updatedUser = {}
    let pageRecipe = {}

    const isLiked = profile.likes.some((id) =>
      id.recipeId === recipe.recipeId
    )

    if (isLiked) {
      updatedRecipe = { name: _recipe.title, recipeId: _recipe.recipeId, likes: _recipe.likes - 1 }
      pageRecipe = { ..._recipe, likes: _recipe.likes - 1 }
      const newLikes = profile.likes.filter((id) => id.recipeId !== recipe.recipeId)
      updatedUser = {
        ...profile, likes: newLikes
      };
      await dispatch(updateRecipeThunk(updatedRecipe))
      dispatch(updateUserThunk(updatedUser));

    } else {
      updatedRecipe = { name: _recipe.title, recipeId: _recipe.recipeId, likes: _recipe.likes + 1 }
      pageRecipe = { ..._recipe, likes: _recipe.likes + 1 }
      updatedUser = {
        ...profile, likes: [...profile.likes, { recipeId: _recipe.recipeId }]
      };
      await dispatch(updateRecipeThunk(updatedRecipe))
      dispatch(updateUserThunk(updatedUser));
    }
    setRecipe(pageRecipe)
    setProfile(updatedUser)
  }

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container>
      <RecipeContainer>
        {currentUser &&
          <Likes>
            {
              protectedMethod()
                ? <FontAwesomeIcon icon={faHeart} size="lg" onClick={handleLike} style={{ color: "#f44343" }} />
                : <FontAwesomeIcon icon={faHeart} size="lg" onClick={handleLike} />
            }
            &nbsp;
            {_recipe.likes}
          </Likes>}
        <BackButton onClick={goBack}>Back</BackButton>
        <RecipeImage src={recipe.image} alt="" />
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeDetail>Serves: {recipe.servings}</RecipeDetail>
        <RecipeDetail>Cook: {recipe.readyInMinutes} mins</RecipeDetail>
        <RecipeDetail>Health Score: {recipe.healthScore}</RecipeDetail>

        <RecipeTitle>Ingredients</RecipeTitle>
        {recipe.extendedIngredients.map((ingredient) =>
          <RecipeDetail> {ingredient.original}</RecipeDetail>
        )}

        <RecipeTitle>Directions</RecipeTitle>
        {recipe.analyzedInstructions[0].steps.map((direction) =>
          <RecipeDetail> {direction.number}. {direction.step}</RecipeDetail>
        )}
      </RecipeContainer>
    </Container>
  );
};

export default RecipeItem;
