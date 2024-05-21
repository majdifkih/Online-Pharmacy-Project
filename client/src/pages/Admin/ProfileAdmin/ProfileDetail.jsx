import { Button } from 'antd';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
const ProfileDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [role, setRole] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        adresse: '',
        telephone: '',
        ancienPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;
            setRole(userRole);
        }
    }, []);
    const userInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const response = await axios.get(`http://localhost:4000/profil/${userId}`);
            const infoUser = response.data;
            setUserData({
                ...userData,
                username: infoUser.username,
                email: infoUser.email,
                adresse: infoUser.adresse,
                telephone: infoUser.telephone,
            });
        } catch (err) {
            console.log(err.message);
        }
    };
    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            setId(userId);
            const response = await axios.delete(`http://localhost:4000/delprofil/${userId}`);
            if (response.status === 200) {

                localStorage.removeItem("token");
                window.location.href = "/login";


            }
        } catch (err) {
            console.log(err.message);
        }
    
    }
    const showModal = () => {
        
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        userInfo();
      }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div >
             
            <fieldset className="info-group-compte">
               
                <legend>Informations Admin</legend>
                <p className='details-items-info'><span className='items-contient-info'>UserName :</span> {userData.username}</p>
                <p className='details-items-info'><span className='items-contient-info'>Address Mail :</span>{userData.email} </p>
                <p className='details-items-info'><span className='items-contient-info'>Address :</span>{userData.adresse} </p>
                <p className='details-items-info'><span className='items-contient-info'>Phone Number:</span>{userData.telephone} </p>
                
                {role !== 'admin' ? <Button onClick={()=>showModal()} style={{float:'right'}} type="primary" danger>Delete Account</Button> : null}
            </fieldset>
            <Modal
            title="Delete Confirmation"
            open={isModalOpen}
            onOk={() => deleteAccount(id)}
            okText="Confirm"
            okType="danger"
            onCancel={handleCancel}
          >
            <p className="alert-msg">Are you sure to delete Account?</p>
          </Modal>
        </div>
    );
};

export default ProfileDetail;
