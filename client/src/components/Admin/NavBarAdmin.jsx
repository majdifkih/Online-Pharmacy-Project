
import { SearchOutlined } from '@ant-design/icons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../../assets/logo.png"

import "../../pages/Admin/dash.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const NavBarAdmin = () => {
	const [nbrcommand, setNbrcommand] = useState(0);

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
    return (
<nav>
			<i class='bx bx-menu' ></i>
			<a href="#" class="nav-link">Categories</a>
			<form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" class="search-btn"><i class='bx bx-search' ><SearchOutlined /></i></button>
				</div>
			</form>
		
			
			<Link to="/commandes" class="notification">
				<i class='bx bxs-bell' ><NotificationsIcon/></i>
				<span class="num">{nbrcommand}</span>
			</Link>
			<a href="#" class="profile">
				<img src={logo}/>
			</a>
		</nav>
    )};

    export default NavBarAdmin;