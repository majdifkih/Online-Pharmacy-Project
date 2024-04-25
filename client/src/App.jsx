import { Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import {FloatButton } from 'antd';
import Register from './pages/Register';
import Medicaments from './pages/Medicaments';
import MedicamentDetail from './pages/MedicamentDetail';

function App() {
  return (
    <div>
      <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/">   
                 <Route path='login' element={<Login />} />
                 <Route path='register' element={<Register />} />
                 <Route path="profil" element={<Profile />} />
                 <Route path='medics' element={<Medicaments />} />
                 <Route path='/MedicDetail/:id'  element={<MedicamentDetail />} />
            </Route>
        </Routes>

        <FloatButton.BackTop />
      <Footer />
    </div>
  );
}

export default App;
