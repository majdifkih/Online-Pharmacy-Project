import "./dash.css";
import { UnorderedListOutlined } from '@ant-design/icons';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "../../components/Admin/SideBar";
import NavBarAdmin from "../../components/Admin/NavBarAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [rows, setRows] = useState([]);
    const [nbrcommand, setNbrcommand] = useState(0);
	const [nbrUsers, setNbrUsers] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const listCommandes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listcommande');
			const today = new Date().toISOString().slice(0, 10); 
            const filteredCommands = response.data.filter(commande => commande.date.slice(0, 10) === today);
            setRows(filteredCommands);
            setNbrcommand(response.data.length);
			let total = 0;
            response.data.forEach(commande => {
                total += commande.PrixTotal;
            });
            setTotalPrice(total);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };
	const listUsers = async () => {
        try {
            const responseuser = await axios.get('http://localhost:4000/auth/users');
            setNbrUsers(responseuser.data.length);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };
    useEffect(() => {
        listCommandes();
		listUsers();
    }, []);
    const handleSearch = (term) => {
        setSearchTerm(term);
      };
    

    return (
        <div className="admin_dashbord">
            <SideBar />
            <section id="content">
                <NavBarAdmin onSearch={handleSearch}/>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Dashboard</h1>
                        </div>
                    </div>

                    <ul className="box-info">
                        <li>
                            <i className='bx bxs-calendar-check'><UnorderedListOutlined /></i>
                            <span className="text">
                                <h3>{nbrcommand}</h3>
                                <p>Order</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-group'><PeopleIcon fontSize="large" /></i>
                            <span className="text">
                                <h3>{nbrUsers}</h3>
                                <p>Clients</p>
                            </span>
                        </li>
                        <li>
                            <i className='bx bxs-dollar-circle'><AttachMoneyIcon fontSize="large" /></i>
                            <span className="text">
                                <h3>${totalPrice}</h3>
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Recent Orders</h3>
                                <Link to="/commandes"><i className='bx bx-search'><UnorderedListOutlined /></i></Link>
                                <i className='bx bx-filter'></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Date Order</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                
                                                <p>{row.userId?.username}</p>
                                            </td>
                                            <td>{new Date(row.date).toLocaleDateString()}</td>
                                            <td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default Dashboard;
