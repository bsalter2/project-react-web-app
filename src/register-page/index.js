import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunk";
import { useNavigate } from "react-router";
import styled from 'styled-components';

const Register = styled.h2`
  margin-bottom: 10px;
  text-align: left;
  color: white;
`;

const RegisterScreen = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async () => {
    try {
      await dispatch(registerThunk(user));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Register>Register</Register>
      <input
        placeholder="Username"
        className="form-control"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className="form-control"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleRegister} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};
export default RegisterScreen;
