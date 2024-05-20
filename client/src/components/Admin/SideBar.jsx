import { HomeOutlined,SearchOutlined,ShoppingCartOutlined,LogoutOutlined,SettingOutlined,ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';
import "../../pages/Admin/dash.css";
import { Link, useNavigate } from 'react-router-dom';
const SideBar = () => {
	const navigate= useNavigate();
	const handleLogout = async ()=> {
		try{
			localStorage.removeItem("token");
			navigate('/login');
			window.location.reload();
		}catch(err){
		  console.log(err.message);
		}
	  }
    return (
<section id="sidebar">
		<a href="#" class="brand">
        
			<span class="text">Online Pharmacy</span>
		</a>
		<ul class="side-menu top">
			<li class="side-li">
				<Link to="/dash">
					<i class='bx bxs-dashboard' ><HomeOutlined /></i>
					<span class="text">Dashboard</span>
				</Link>
			</li>
			<li class="side-li">
				<Link to="/commandes" className='side-link'>
					<i class='bx bxs-shopping-bag-alt' ><ShoppingCartOutlined /></i>
					<span class="text">Commandes</span>
				</Link>
			</li>
			<li class="side-li">
				<Link to="/medicaments" className='side-link'>
				<i class='bx bxs-group' ><ProductOutlined /></i>
					<span class="text">Medicaments</span>
				</Link>
			</li>
		
		</ul>
		<ul class="side-menu">
			<li class="side-li">
				<Link to="/profiladmin" className='side-link'>
					<i class='bx bxs-cog' ><SettingOutlined /></i>
					<span class="text">Profil</span>
				</Link>
			</li>
			<li class="side-li" onClick={handleLogout}>
				<a href="#" class="logout">
					<i class='bx bxs-log-out-circle' ><LogoutOutlined /></i>
					<span class="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
    )};

    export default SideBar;