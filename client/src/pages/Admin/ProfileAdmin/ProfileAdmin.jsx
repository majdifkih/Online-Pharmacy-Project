import React, { useState, useEffect } from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import ProfileDetail from "./ProfileDetail";
import ProfileEdit from "./ProfileEdit";
import { Tabs } from 'antd';
import './profile.css';
import NavBar from "../../../components/NavBar";
import {jwtDecode} from 'jwt-decode'; // Corrected import
import axios from 'axios';
import Footer from "../../../components/Footer";

const ProfileAdmin = () => {
    const [activeTab, setActiveTab] = useState("0");
    const [role, setRole] = useState(null);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

   
        
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;
            setRole(userRole);
        }
    }, []);
                    
         

    if (role === null) {
        return <div>Loading...</div>; // ou un spinner
    }

    
    return (
        <div className="admin_dashbord" >
            {role === 'admin' ? <SideBar /> : <NavBar />}
            <section id="content">
                {role === 'admin' ? <NavBarAdmin /> : null}
                <main>
                    <h1 className="title-param">Paramétre du compte</h1>
                    <div className="tab-content">
                        <Tabs
                            activeKey={activeTab}
                            onChange={handleTabChange}
                            tabPosition="left"
                            style={{ height: "100%" }}
                        >
                            <Tabs.TabPane
                                tab={
                                    <span className={`tab-label ${activeTab === "0" ? "active" : ""}`}>
                                        <InfoIcon /> Informations du compte
                                    </span>
                                }
                                key="0"
                            >
                                <div className="tab-pane-content">
                                    <ProfileDetail />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                tab={
                                    <span className={`tab-label ${activeTab === "1" ? "active" : ""}`}>
                                        <ManageAccountsIcon /> Configuration du compte
                                    </span>
                                }
                                key="1"
                            >
                                <div className="tab-pane-content">
                                    <ProfileEdit />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </main>
            </section>
            {role !== 'admin' ? <Footer /> : null}
        </div>
    );
};

export default ProfileAdmin;
