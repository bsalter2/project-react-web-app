import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk, deleteUserThunk } from "../services/users-thunk";
import styled from 'styled-components';

const UserItem = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  background-color: #15202b;
  color: white;
`;

const UserTitle = styled.h5`
  font-size: 18px;
  font-weight: 700;
  flex-grow: 1;
`;

const UserDetails = styled.p`
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  color: #fff;
  background-color: #ff6347; 
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000; 
  }
`;

function Admin() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUserThunk(id));
  };

  return (
    <div className="container">
      <div className="row">
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserTitle>{user.username}</UserTitle>
            <UserDetails>First Name: {user.firstName}</UserDetails>
            <UserDetails>Last Name: {user.lastName}</UserDetails>
            {/* <UserDetails>Email: {user.email}</UserDetails> */}
            <DeleteButton onClick={() => handleDelete(user.id)}>Delete</DeleteButton>
          </UserItem>
        ))}
      </div>
    </div>
  );
}

export default Admin;
