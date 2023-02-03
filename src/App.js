import React from "react";
import "./App.css";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./page/home";
import Movie from "./page/movie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies/:id" element={<Movie />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
