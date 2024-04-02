import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from './pages/profile';
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/login';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
              <Route exact path="/" element={<Home />} />
            <Route path="/">   
                 {/*<Route path="home" index element={<Home />} /> */}
                 <Route path='login' element={<Login />} />
                 <Route path="profil" element={<Profile />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
