import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  background-color: #15202b;
  color: white;
`;

const RecipeLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  &:hover {
    color: #1da1f2;
  }
`;

const RecipeTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  flex-grow: 1;
`;

const RecipeImage = styled.img`
  height: 80px;
  border-radius: 10px;
`;

const RecipeSummaryItem = ({ recipe }) => {

  const handleNavigate = (recipeId) => {
    Navigate(`/details/${recipeId}`);
  };
  return (
    <ListItem>
      <RecipeLink
        to={`/details/${recipe.id}`}
        onClick={() => handleNavigate(recipe.id)}
      >
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeImage
          src={recipe.image}
          alt={"./images/alt_recipe_image.jpeg"}
        />
      </RecipeLink>
    </ListItem>
  );
};

export default RecipeSummaryItem;
