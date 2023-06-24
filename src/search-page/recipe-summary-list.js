import React from "react";
import RecipeSummaryItem from './recipe-summary-item';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LoadingListItem = styled.li`
  border: 2px solid white;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  background-color: #15202b;
  color: white;
`;

function RecipeSummaryList({ limit }) {
  const { recipes, loading } = useSelector(state => state.recipes);
  const randomRecipes = [...recipes].sort(() => .5 - Math.random()).slice(0, limit);

  return (
    <StyledList>
      {loading ? (
        <LoadingListItem>
          Loading...
        </LoadingListItem>
      ) : (
        randomRecipes.map(recipe => (
          <RecipeSummaryItem key={recipe.id} recipe={recipe} />
        ))
      )}
    </StyledList>
  );
}

export default RecipeSummaryList;

