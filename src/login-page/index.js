import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../services/auth-thunk";
import { useNavigate } from "react-router";
import styled from 'styled-components';

const Login = styled.h2`
  margin-bottom: 10px;
  text-align: left;
  color: white;
`;

const LoginScreen = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      await dispatch(loginThunk(user));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Login>Login</Login>
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
      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};
export default LoginScreen;
