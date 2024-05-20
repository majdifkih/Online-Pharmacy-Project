
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import ProfileDetail from "./ProfileDetail";
import ProfileEdit from "./ProfileEdit";
import { Tabs } from 'antd';
import './profile.css';
const ProfileAdmin = () => {

    const [activeTab, setActiveTab] = useState("0");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };
    return (
        <div className="admin_dashbord">
      <SideBar />
      <section id="content">
        <NavBarAdmin />
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
                                <ManageAccountsIcon/> Configuration du compte
                            </span>
                        }
                        key="0"
                    >
                        <div className="tab-pane-content">
                            <ProfileEdit />
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span className={`tab-label ${activeTab === "1" ? "active" : ""}`}>
                               <InfoIcon/> Informations du compte
                            </span>
                        }
                        key="1"
                    >
                        <div className="tab-pane-content">
                            <ProfileDetail />
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
       
    
    
    </main>
        </section>
        </div>
    );
};

export default ProfileAdmin;
