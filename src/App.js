import React from 'react';
import './App.css';
import { BrowserRouter, Navigate } from "react-router-dom"
import { Routes, Route } from "react-router"
import SearchScreen from './search-page';
import HomeScreen from './home-page';
import DetailsScreen from './details-page';
import ProfileScreen from './profile-page';
import LoginScreen from './login-page';
import NavigationSidebar from './navigation-sidebar';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './reducers/recipes-reducer';
import singleRecipeReducer from './reducers/single-recipe-reducer';
import styled from 'styled-components';
import TrendingSidebar from './trending/trending';

const AppContainer = styled.div`
  background-color: #15202b;
  min-height: 100vh;
  width: 100vw;
`;

const store = configureStore(
  {
    reducer: {
      recipes: recipeReducer, 
      single_recipe: singleRecipeReducer
    }
  }
);

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Provider store={store}>
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
                <Route path="/profile/" element={<ProfileScreen />} />
                <Route path="/login/" element={<LoginScreen />} />
              </Routes>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-2 d-none d-lg-block">
              <TrendingSidebar />
            </div>
          </div>
        </Provider>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

