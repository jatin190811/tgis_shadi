import './App.css';
import React,{useEffect} from 'react';
import Header from './components/header';
import Layout from './components/Layout';
import Footer from './components/footer';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import ForgetPassword from './pages/Forget-Password';
import Onboarding from './pages/Onboarding';
import Category from './pages/Category';
import Details from './pages/Details'
import ContactUs from './pages/Contact_us';
import Blogs from './pages/Blogs';
import IndiBlog from './pages/indi_blog';
import List from './pages/List';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import SearchPage from './pages/SearchPage';
import VendorPage from './pages/VendorPage';
import Inhouse from './pages/Inhouse';


function App() {
    return (
        <BrowserRouter>
{<Layout hideHeaderPaths={["/login","/onboarding","/register","/vendor"]} isHeader="true" />}
            <Routes>
            
                <Route path="/" element={<Home/>} />
                <Route path="/list/:type" element={<List/>} />
                <Route path="/list/:type/inhouse/" element={<Inhouse/>} />
                <Route path="/category" element={<Category/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<IndiBlog />} />
                <Route path="/entity/:type/:id" element={<Details />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/change-password" element={<Register />} />
                <Route path="/update-profile" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/vendor" element={<VendorPage />} />
            </Routes>
            {<Layout hideHeaderPaths={["/login","/onboarding","/register","/vendor"]} isFooter="true" />}
            {/* <Footer/> */}
        </BrowserRouter>
    );
}
export default App;

