import React from "react";
import "./App.css";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import SearchScreen from "./search-page";
import HomeScreen from "./home-page";
import DetailsScreen from "./details-page";
import LoginScreen from "./login-page";
import NavigationSidebar from "./navigation-sidebar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./reducers/recipes-reducer";
import singleRecipeReducer from "./reducers/single-recipe-reducer";
import styled from "styled-components";
import TrendingSidebar from "./trending/trending";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import ProtectedRoute from "./login-page/protected-route";
import RegisterScreen from "./register-page";
import UsersContextLoader from "./login-page/users-context-loader";
import ProfileScreenPublic from "./profile-page/profile-other";
import ProfileScreen from "./profile-page/profile-self";
import ProfileLikes from "./profile-page/profile-likes";
import ProfileFollowers from "./profile-page/profile-followers";
import ProfileFollowing from "./profile-page/profile-following";
import ProtectedRouteLoggedIn from "./login-page/protected-route-logged-in";
import Admin from "./admin-page/admin";
import AdminProtectedRoute from "./admin-page/admin-protected-route";

const AppContainer = styled.div`
  background-color: #15202b;
  min-height: 100vh;
  width: 100vw;
`;

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    single_recipe: singleRecipeReducer,
    users: usersReducer,
    currentUser: authReducer,
  },
});

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Provider store={store}>
          <UsersContextLoader>
            <div className="row wd-frame">
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                <NavigationSidebar />
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-9 col-sm-9">
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home/" element={<HomeScreen />} />
                  <Route path="/search/" element={<SearchScreen />} />
                  <Route path="/search/:sc" element={<SearchScreen />} />
                  <Route path="/details/:did" element={<DetailsScreen />} />
                  <Route
                    path="/profile/:username"
                    element={<ProfileScreenPublic />}
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <ProtectedRouteLoggedIn>
                        <LoginScreen />
                      </ProtectedRouteLoggedIn>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <ProtectedRouteLoggedIn>
                        <RegisterScreen />
                      </ProtectedRouteLoggedIn>
                    }
                  />
                  <Route
                    path="/profile/likes"
                    element={
                      <ProtectedRoute>
                        <ProfileLikes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/followers"
                    element={
                      <ProtectedRoute>
                        <ProfileFollowers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/following"
                    element={
                      <ProtectedRoute>
                        <ProfileFollowing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoute>
                        <Admin />
                      </AdminProtectedRoute>
                    }
                  />
                </Routes>
              </div>
              {!SearchScreen ? null : (
                <div className="col-xxl-3 col-xl-3 col-lg-2 d-none d-lg-block">
                  <TrendingSidebar />
                </div>
              )}
            </div>
          </UsersContextLoader>
        </Provider>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
