import React from 'react';
import './App.css';
import {BrowserRouter, Navigate} from "react-router-dom"
import {Routes, Route} from "react-router"
import Search from './search-page';
import Home from './home-page';

function App() {
   return (
      <BrowserRouter>
        <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/search/*" element={<Search/>}/>
        </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
