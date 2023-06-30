import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminHeader from "../components/admin/AdminHeader";

import Cities from "../pages/admin/Cities";
import Districts from "../pages/admin/Districts";
import Home from "../pages/admin/Home";
import Language from "../pages/admin/Language";
import Login from "../pages/admin/Login";
import Movies from "../pages/admin/Movies";
import Users from "../pages/admin/Users";
import Vendors from '../pages/admin/Vendors'

const AdminRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/admin' element={<Login />} />
                    <Route path='/admin/home' element={<AdminHeader />} >
                        <Route path="add/languages" element={<Language />} />
                        <Route index path="" element={<Home />} />
                        <Route index element={<Home />} />
                        <Route path="add/movies" element={<Movies />} />
                        <Route path="add/cities" element={<Cities />} />
                        <Route path="add/users" element={<Users />} />
                        <Route path="add/districts" element={<Districts />} />
                        <Route path="add/vendors" element={<Vendors />} />
                        
                    </Route>
                </Routes>
            </Router>


        </>
    );
};

export default AdminRoutes;
