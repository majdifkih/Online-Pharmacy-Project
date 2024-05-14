import { Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';

import Login from './pages/login';
import Home from './pages/Home';
import {FloatButton } from 'antd';
import Register from './pages/Register';
import Medicaments from './pages/Medicaments';
import MedicamentDetail from './pages/MedicamentDetail';
import Dashboard from './pages/Dashboard/Dashboard';
import ListCommande from './pages/Commande/ListCommande';

function App() {
  return (
    <div>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/">   
                 <Route path='login' element={<Login />} />
                 <Route path='register' element={<Register />} />
                 <Route path="profil" element={<Profile />} />
                 <Route path='medics' element={<Medicaments />} />
                 <Route path='/MedicDetail/:id'  element={<MedicamentDetail />} />

                 <Route path="dash" element={<Dashboard/>} />
                 <Route path="commandes" element={<ListCommande/>} />
            </Route>
        </Routes>
        

        <FloatButton.BackTop />
    </div>
  );
}

export default App;
