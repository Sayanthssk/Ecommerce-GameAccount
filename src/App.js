import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/signup/signup";
import Login from "./components/signup/login";
import User from "./components/signup/UserDetails";
import GameAccountDetail from "./components/Buyer/AccountDetails";
import GameAccountList from "./components/Buyer/GameAccountList";
import AddGameAccount from "./components/Seller/AddGameAccount";
import Profile from "./components/signup/Profile";
import BuyerHome from "./components/Buyer/BuyerHome";
import SellerHome from "./components/Seller/SellerHome";
import AdminHome from "./components/Admin/AdminHome";
import UpdateProfile from "./components/signup/UpdateProfile";
import ViewOwnAccount from "./components/Seller/ViewOwnAccount";
import ViewAccountInDetails from "./components/Seller/ViewAccountInDetails";
import UpdateGameAccount from "./components/Seller/UpdateGameAccount";




const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<AddGameAccount />} /> 
          <Route path="/game" element={<GameAccountList />} /> 
          <Route path="/gameaccount" element={<GameAccountDetail />} /> 
          <Route path="/buyer" element={<BuyerHome />} /> 
          <Route path="/seller" element={<SellerHome />} /> 
          <Route path="/admin" element={<AdminHome />} /> 
          <Route path="/update-profile" element={<UpdateProfile />} /> 
          <Route path="/userGameAccount" element={<ViewOwnAccount />} /> 
          <Route path="/ownaccount" element={<ViewAccountInDetails />} /> 
          <Route path="/updateGame" element={<UpdateGameAccount />} /> 
        </Routes>
      </Router>
    </div>
  )
}
export default App






