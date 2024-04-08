import { Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/">   
                 <Route path='login' element={<Login />} />
                 <Route path="profil" element={<Profile />} />
            </Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
