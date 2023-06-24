import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../services/users-thunk";
import { findAllRecipesThunk } from "../services/recipes-thunk";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import RecipeSummaryList from "../search-page/recipe-summary-list";
const TrendingSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  padding: 0;
  background-color: #15202b;
  color: white;
  margin-top: 10px;
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "#1DA1F2" : "white")};
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid white;
  &:hover {
    background-color: #1da1f2;
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
const UserTitle = styled.h5`
  font-size: 18px;
  font-weight: 700;
  flex-grow: 1;
`;

const UserItem = ({ user }) => (
  <TrendingItem>
    <TrendingRecipeItem>
      <TrendingIcon>
        <FaUser />
      </TrendingIcon>
      <UserTitle>{user.username}</UserTitle>
    </TrendingRecipeItem>
  </TrendingItem>
);

const TrendingSidebar = () => {
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(findAllRecipesThunk());
  }, [dispatch]);

  return (
    <TrendingSidebarContainer>
      <TrendingTitle>
        {currentUser ? "All Users" : "Recommended Recipes"}
      </TrendingTitle>
      <TrendingList>
        {currentUser ? (
          users.map((user) => <UserItem key={user.id} user={user} />)
        ) : (
          <RecipeSummaryList limit={3} />
        )}
      </TrendingList>
    </TrendingSidebarContainer>
  );
};

export default TrendingSidebar;
