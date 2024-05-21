import { Button, Modal } from 'antd';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const ProfileDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null); 
    const [role, setRole] = useState(null);

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
            const responseprofil = await axios.get(`http://localhost:4000/profil/${userId}`);
            setUser(responseprofil.data.user); 
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        userInfo();
      }, []);
    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const response = await axios.delete(`http://localhost:4000/delprofil/${userId}`);
            if (response.status === 200) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        userInfo();
    }, []);

    return (
        <div>
            <fieldset className="info-group-compte">
                <legend>Informations Admin</legend>
                {user && (
                    <>
                        <p className='details-items-info'><span className='items-contient-info'>UserName :</span> {user.username}</p>
                        <p className='details-items-info'><span className='items-contient-info'>Address Mail :</span> {user.email}</p>
                        <p className='details-items-info'><span className='items-contient-info'>Address :</span> {user.adresse}</p>
                        <p className='details-items-info'><span className='items-contient-info'>Phone Number:</span> {user.telephone}</p>
                    </>
                )}
                {role !== 'admin' ? <Button onClick={showModal} style={{ float: 'right' }} type="primary" danger>Delete Account</Button> : null}
            </fieldset>
   
            <Modal
                title="Delete Confirmation"
                open={isModalOpen}
                onOk={deleteAccount}
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
