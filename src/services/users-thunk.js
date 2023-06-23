import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "./users-service";

export const getAllUsersThunk = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    const users = await userService.getAllUsers();
    return users;
  }
);

export const getUserByIDThunk = createAsyncThunk(
  "users/getUserByID",
  async (id) => {
    const user = await userService.getUserByID(id);
    return user;
  }
);

export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (user) => {
    const createdUser = await userService.createUser(user);
    return createdUser;
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (user) => {
    await userService.deleteUser(user);
    const users = await userService.getAllUsers();
    return users;
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async (user) => {
    const status = await userService.updateUser(user._id, user);
    return user;
  }
);
