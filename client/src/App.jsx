import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import React, { useEffect, useState,createContext, useContext, } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './pages/login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import { FloatButton } from 'antd';
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
import UnauthorisedPage from './pages/UnauthorisedPage';
import ProfileAdmin from './pages/Admin/ProfileAdmin/ProfileAdmin';


const RoleContext = createContext();

function App() {
  const [role, setRole] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setRole(userRole);
    }
  },[]);

  return (
<RoleContext.Provider value={role}>
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
                 <Route path="mescommandes" element={role === 'client' ? <UserCommandes />: <p><UnauthorisedPage/></p>} />
                 <Route path="MedicDetail/:id" element={<MedicamentDetail />} />
                 <Route path="dash" element={role === 'admin' ? <Dashboard /> : <p><UnauthorisedPage/></p>} />
                 <Route path="commandes" element={role === 'admin' ? <ListCommande /> : <p><UnauthorisedPage/></p>} />
                 <Route path="medicaments" element={role === 'admin' ?<Stock />: <p><UnauthorisedPage/></p>} />
                 <Route path="addmedicament" element={role === 'admin' ?<AddStock />: <p><UnauthorisedPage/></p>} />
                 <Route path="editmedicament/:id" element={role === 'admin' ?<EditStock />: <p><UnauthorisedPage/></p>} />
                 <Route path="detailmedicament/:id" element={role === 'admin' ?<StockDetail />: <p><UnauthorisedPage/></p>} />
                 <Route path="detailcommand/:id" element={role === 'admin' ?<CommandDetail />: <p><UnauthorisedPage/></p>} />
                 <Route path="profileadmin" element={role === 'admin' ?<ProfileAdmin />: <p><UnauthorisedPage/></p>} />
        </Route>
      </Routes>
      <FloatButton.BackTop />
    </div>
</ RoleContext.Provider>    
  );
}

export default App;
