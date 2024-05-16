import "./dash.css"
import { UnorderedListOutlined } from '@ant-design/icons';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "../../components/Admin/SideBar";
import NavBarAdmin from "../../components/Admin/NavBarAdmin";
const Dashboard = () => {
 
  return (
    <div className="admin_dashbord">
	<SideBar/>
	<section id="content">
		<NavBarAdmin/>
		
		<main>
			<div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
				</div>
			</div>

			<ul class="box-info">
				<li>
					<i class='bx bxs-calendar-check' ><UnorderedListOutlined /></i>
					<span class="text">
						<h3>1020</h3>
						<p>Order</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-group' ><PeopleIcon fontSize="large"/></i>
					<span class="text">
						<h3>2834</h3>
						<p>Clients</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-dollar-circle' ><AttachMoneyIcon fontSize="large"/></i>
					<span class="text">
						<h3>$2543</h3>
						<p>Total Sales</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Recent Orders</h3>
						<i class='bx bx-search' ><UnorderedListOutlined /></i>
						<i class='bx bx-filter' ></i>
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
							<tr>
								<td>
									<img src="img/people.png" />
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
							
						</tbody>
					</table>
				</div>
				<div class="todo">
					<div class="head">
						<h3>Todos</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						
					</ul>
				</div>
			</div>
		</main>
		
	</section>

    </div>
  );
};

export default Dashboard;