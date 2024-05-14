import { HomeOutlined,SearchOutlined,ShoppingCartOutlined,LogoutOutlined,SettingOutlined,ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';
import "../../pages/Dashboard/dash.css";
import { Link } from 'react-router-dom';
const SideBar = () => {
 
    return (
<section id="sidebar">
		<a href="#" class="brand">
        
			<span class="text">Online Pharmacy</span>
		</a>
		<ul class="side-menu top">
			<li class="side-li">
				<a href="#">
					<i class='bx bxs-dashboard' ><HomeOutlined /></i>
					<span class="text">Dashboard</span>
				</a>
			</li>
			<li class="side-li">
				<Link to="/commandes" className='side-link'>
					<i class='bx bxs-shopping-bag-alt' ><ShoppingCartOutlined /></i>
					<span class="text">My Store</span>
				</Link>
			</li>
			<li class="side-li">
				<Link to="#" className='side-link'>
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">Analytics</span>
				</Link>
			</li>
			<li class="side-li">
			
				<Link to="/" className='side-link'>
					<i class='bx bxs-message-dots' ></i>
					<span class="text">Message</span>
				</Link>
				
			</li>
			<li class="side-li">
				<Link to="/" className='side-link'>
					<i class='bx bxs-group' ><ProductOutlined /></i>
					<span class="text">Team</span>
				</Link>
			</li>
		</ul>
		<ul class="side-menu">
			<li class="side-li">
				<Link to="#" className='side-link'>
					<i class='bx bxs-cog' ><SettingOutlined /></i>
					<span class="text">Settings</span>
				</Link>
			</li>
			<li class="side-li">
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ><LogoutOutlined /></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
    )};

    export default SideBar;