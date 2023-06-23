import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  profileThunk,
  logoutThunk,
} from "../services/auth-thunk";

const initialState = {
  error: null,
  loading: false,
  currentUser: null,
  users: [],
};

const authSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    [logoutThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [logoutThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    [profileThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [profileThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    [loginThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [loginThunk.rejected]: (state, action) => {
      state.currentUser = [];
      state.loading = false;
      state.error = action.error;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.users = [...state.users, state.currentUser];
    },
    [registerThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerThunk.rejected]: (state, action) => {
      state.currentUser = [];
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default authSlice.reducer;
