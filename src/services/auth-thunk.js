import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (user) => {
    const currentUser = await authService.register(user);
    return currentUser;
  }
);

export const loginThunk = createAsyncThunk("auth/login", async (user) => {
  const currentUser = await authService.login(user);
  return currentUser;
});

export const profileThunk = createAsyncThunk("auth/profile", async () => {
  const currentUser = await authService.profile();
  return currentUser;
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
