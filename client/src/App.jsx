import { Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';
import React, { useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './pages/login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import {FloatButton } from 'antd';
import Register from './pages/Register';
import Medicaments from './pages/Medicaments';
import MedicamentDetail from './pages/MedicamentDetail';
import Dashboard from './pages/Admin/Dashboard';
import ListCommande from './pages/Admin/Command/ListCommande';
import Stock from './pages/Admin/Stock/Stock';
import AddStock from './pages/Admin/Stock/AddStock';
import EditStock from './pages/Admin/Stock/EditStock';
import UserCommandes from './pages/UserCommandes';
import StockDetail from './pages/Admin/Stock/StockDetail';
import CommandDetail from './pages/Admin/Command/CommandDetail';



function App() {
  const [role,SetRole]=useState(false);
useEffect(()=>{
  const token = localStorage.getItem("token");
  if (token){
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  if (userRole === 'admin') {
    SetRole(true);
  }
}
}, [])

  return (
    <div>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/">   
                 <Route path='login' element={<Login />} />
                 <Route path='register' element={<Register />} />
                 <Route path="profil" element={<Profile />} />
                 <Route path='medics' element={<Medicaments />} />
                 <Route path='about' element={<AboutUs />} />
                 <Route path='contact' element = {<Contact />} />
                 <Route path='mescommandes' element = {<UserCommandes />} />
                 <Route path='MedicDetail/:id'  element={<MedicamentDetail />} />
                 <Route path="dash" element={<Dashboard/>} />
                 <Route path="commandes" element={<ListCommande/>} />
                 <Route path="medicaments" element={<Stock/>} />
                 <Route path="addmedicament" element={<AddStock/>} />
                 <Route path="editmedicament/:id" element={<EditStock/>} />
                 <Route path="detailmedicament/:id" element={<StockDetail/>} />
                 <Route path="detailcommand/:id" element={<CommandDetail/>} />
            </Route>
        </Routes>

        <FloatButton.BackTop />
    </div>
  );
}

export default App;
