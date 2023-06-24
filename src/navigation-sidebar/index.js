import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaSearch,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";

const SidebarContainer = styled.div`
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

const StyledIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const NavigationSidebar = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const { pathname } = useLocation();
  const [ignore, active] = pathname.split("/");
  const links = [
    { name: "home", icon: <FaHome /> },
    { name: "search", icon: <FaSearch /> },
  ];

  return (
    <SidebarContainer>
      {links.map((link) => (
        <StyledLink to={`/${link.name}`} isActive={active === link.name}>
          <StyledIcon>{link.icon}</StyledIcon>
          {link.name}
        </StyledLink>
      ))}
      {currentUser && (
        <StyledLink to="/profile" isActive={active === "profile"}>
          <StyledIcon>
            <FaUser />
          </StyledIcon>
          profile
        </StyledLink>
      )}
      {!currentUser && (
        <StyledLink to="/login" isActive={active === "login"}>
          <StyledIcon>
            <FaSignInAlt />
          </StyledIcon>
          login
        </StyledLink>
      )}
      {!currentUser && (
        <StyledLink to="/register" isActive={active === "register"}>
          <StyledIcon>
            <FaUserPlus />
          </StyledIcon>
          register
        </StyledLink>
      )}
      {currentUser && currentUser.role==="admin" && (
        <StyledLink to="/admin" isActive={active === "admin"}>
          <StyledIcon>
            <FaUserShield />
          </StyledIcon>
          admin
        </StyledLink>
      )}
    </SidebarContainer>
  );
};

export default NavigationSidebar;
