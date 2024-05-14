
import { SearchOutlined } from '@ant-design/icons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from "../../assets/logo.png"

import "../../pages/Dashboard/dash.css";
const NavBarAdmin = () => {
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
		
			
			<a href="#" class="notification">
				<i class='bx bxs-bell' ><NotificationsIcon/></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src={logo}/>
			</a>
		</nav>
    )};

    export default NavBarAdmin;