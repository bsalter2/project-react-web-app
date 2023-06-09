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

function App() {
  return (
    <BrowserRouter>
      <div className="row wd-frame">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3">
          <NavigationSidebar />
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-9 col-sm-9">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home/" element={<HomeScreen />} />
            <Route path="/search/" element={<SearchScreen />} />
            <Route path="/details/" element={<DetailsScreen />} />
            <Route path="/profile/" element={<ProfileScreen />} />
            <Route path="/login/" element={<LoginScreen />} />
          </Routes>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-2 d-none d-lg-block">
          TODO
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App;
