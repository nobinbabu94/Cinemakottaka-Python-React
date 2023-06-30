import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/vendor/Header";
import Home from "../pages/vendor/Home";
import Login from "../pages/vendor/Login";
import Register from "../pages/vendor/Register";
import Screen from "../pages/vendor/Screen";
import Seats from "../pages/vendor/Seats";
import Show from "../pages/vendor/Show";

const VendorsRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/partners/register" element={<Register />} />
          <Route path="/partners" element={<Login />} />

          <Route path="/partners/home" element={<Header />}>
            <Route path="home" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="show" element={<Show />} />
            <Route path="seats" element={<Seats />} />
            <Route path="screen" element={<Screen />} />
            {/* <Route index element={<Home />} /> 
                    <Route path='/addshow' element={<Show/>} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default VendorsRoutes;
