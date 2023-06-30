import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/user/Contact";
import Home from "../pages/user/Home";
import Login from '../pages/user/Login'
import Movies from "../pages/user/Movies";
import Register from "../pages/user/Register";
import Theater from "../pages/user/Theater";


const UserRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
               
                        <Route exact path='/' element={<Dashboard />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Register />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/movies' element={<Movies />} />
                        <Route path='/theaters' element={<Theater />} />
                        <Route path='contact' element={<Contact />} />
              
                    {/* vendor routes */}
                  


                </Routes>
            </Router>


        </>
    );
};

export default UserRoutes;
