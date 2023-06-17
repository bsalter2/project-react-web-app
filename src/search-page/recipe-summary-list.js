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

function RecipeSummaryList() {

    const { recipes, loading } = useSelector(state => state.recipes);

    return (
        <StyledList>
            {loading ?
                <LoadingListItem>
                    Loading...
                </LoadingListItem> : recipes.map(recipe =>
                    <RecipeSummaryItem
                        key={recipe.id} recipe={recipe} />)
            }
        </StyledList>
    )
}

export default RecipeSummaryList;
