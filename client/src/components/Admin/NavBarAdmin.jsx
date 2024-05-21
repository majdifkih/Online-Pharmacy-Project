import { SearchOutlined } from '@ant-design/icons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../../assets/logo.png";
import "../../pages/Admin/dash.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const NavBarAdmin = ({ onSearch }) => {
  const [nbrcommand, setNbrcommand] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const listCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/listcommande');
      const today = new Date().toISOString().slice(0, 10);
      const filteredCommands = response.data.filter(commande => commande.date.slice(0, 10) === today);
      setNbrcommand(filteredCommands.length);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    listCommandes();
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  return (
    <nav>
      <i className='bx bx-menu'></i>
      <form action="#">
        <div className="form-input">
          <input
            type="search"
            placeholder="Search Medicaments..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn">
            <i className='bx bx-search'>
              <SearchOutlined />
            </i>
          </button>
        </div>
      </form>
      <Link to="/commandes" className="notification">
        <i className='bx bxs-bell'>
          <NotificationsIcon />
        </i>
        <span className="num">{nbrcommand}</span>
      </Link>
      <a href="#" className="profile">
        <img src={logo} alt="Profile" />
      </a>
    </nav>
  );
};

export default NavBarAdmin;
