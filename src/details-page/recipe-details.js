import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { updateRecipeThunk } from "../services/recipes-thunk";
import { updateUserThunk } from "../services/users-thunk";
import { profileThunk } from "../services/auth-thunk";

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
    background-color: #1da1f2;
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
    content: "";
    position: absolute;
    left: 0;
    bottom: 0; /* Adjust this to control the vertical position of the underline */
    width: 100%;
    height: 2px; /* control thickness of underline */
    background: currentColor;
  }
`;

const RecipeDetail = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const RecipeItem = ({ recipe }) => {
  const [_recipe, setRecipe] = useState(recipe);
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [isLiked, setLike] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const protectedMethod = () => {
    if (profile) {
      for (const id of profile.likes) {
        if (id == recipe.recipeId) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  const handleLike = async () => {
    let updatedRecipe = {};
    let updatedUser = {};
    let pageRecipe = {};
    
    if (isLiked) {
      updatedRecipe = {
        name: _recipe.title,
        recipeId: _recipe.recipeId,
        likes: _recipe.likes - 1,
      };
      pageRecipe = { ..._recipe, likes: _recipe.likes - 1 };
      const newLikes = [];
      for (const id of profile.likes) {
        if (id !== _recipe.recipeId) {
          newLikes.push(id);
        }
      }
      updatedUser = {
        ...profile,
        likes: newLikes,
      };
      dispatch(updateRecipeThunk(updatedRecipe));
      dispatch(updateUserThunk(updatedUser));
    } else {
      updatedRecipe = {
        name: _recipe.title,
        recipeId: _recipe.recipeId,
        likes: _recipe.likes + 1,
      };
      pageRecipe = { ..._recipe, likes: _recipe.likes + 1 };
      updatedUser = {
        ...profile,
        likes: [...profile.likes, _recipe.recipeId],
      };
      dispatch(updateRecipeThunk(updatedRecipe));
      dispatch(updateUserThunk(updatedUser));
    }
    setProfile(updatedUser);
    setLike(!isLiked);
    setRecipe(pageRecipe);
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
      if (profile) {
        const result = protectedMethod();
        setLike(result);
      }
    };
    loadProfile();
  }, [dispatch]);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container>
      <RecipeContainer>
        {currentUser && (
          <Likes>
            {isLiked ? (
              <FontAwesomeIcon
                icon={faHeart}
                size="lg"
                onClick={handleLike}
                style={{ color: "#f44343" }}
              />
            ) : (
              <FontAwesomeIcon icon={faHeart} size="lg" onClick={handleLike} />
            )}
            &nbsp;
            {_recipe.likes}
          </Likes>
        )}
        <BackButton onClick={goBack}>Back</BackButton>
        <RecipeImage src={recipe.image} alt="" />
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeDetail>Serves: {recipe.servings}</RecipeDetail>
        <RecipeDetail>Cook: {recipe.readyInMinutes} mins</RecipeDetail>
        <RecipeDetail>Health Score: {recipe.healthScore}</RecipeDetail>

        <RecipeTitle>Ingredients</RecipeTitle>
        {recipe.extendedIngredients.map((ingredient) => (
          <RecipeDetail> {ingredient.original}</RecipeDetail>
        ))}

        <RecipeTitle>Directions</RecipeTitle>
        {recipe.analyzedInstructions[0].steps.map((direction) => (
          <RecipeDetail>
            {direction.number}. {direction.step}
          </RecipeDetail>
        ))}
      </RecipeContainer>
    </Container>
  );
};

export default RecipeItem;
