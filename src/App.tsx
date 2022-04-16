import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/home";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
