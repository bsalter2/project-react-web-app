import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaFire } from 'react-icons/fa';

const TrendingSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  padding: 0;
  background-color: #15202b;
  color: white;
  border: 2px solid white;
  margin-top: 10px;
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.isActive ? '#1DA1F2' : 'white')};
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid white;
  &:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }
`;

const TrendingTitle = styled.h2`
  font-size: 18px;
  margin: 20px 0;
  align-self: center;
  color: white;
  border-bottom: 1px solid white;
`;

const TrendingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrendingItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TrendingRecipeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;

const TrendingIcon = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;

const TrendingRecipe = ({ name }) => (
  <TrendingItem>
    <TrendingRecipeItem>
      <TrendingIcon>
        <FaFire />
      </TrendingIcon>
      {name}
    </TrendingRecipeItem>
  </TrendingItem>
);

const TrendingSidebar = () => {
  const { pathname } = useLocation();
  const [ignore, active] = pathname.split('/');

  const trendingRecipes = ['Recipe 1', 'Recipe 2', 'Recipe 3', 'Recipe 4']; // Replace with your actual trending recipes data

  return (
    <TrendingSidebarContainer>
      <TrendingTitle>Trending Recipes</TrendingTitle>
      <TrendingList>
        {trendingRecipes.map((recipe, index) => (
          <StyledLink to={`/${recipe}`} isActive={active === recipe} key={index}>
            <TrendingRecipe name={recipe} />
          </StyledLink>
        ))}
      </TrendingList>
    </TrendingSidebarContainer>
  );
};

export default TrendingSidebar;