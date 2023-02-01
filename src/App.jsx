import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { utilsSearch } from '../../utils/movie-api-search';
// import Navbar from '../../components/Navbar/Navbar';

import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
