import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const ProfileDetail = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        adresse: '',
        telephone: '',
        ancienPassword: '',
        newPassword: '',
    });


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

    useEffect(() => {
        userInfo();
      }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
             
            <fieldset className="info-group-compte">
               
                <legend>Informations Admin</legend>
                <p className='details-items-info'><span className='items-contient-info'>UserName :</span> {userData.username}</p>
                <p className='details-items-info'><span className='items-contient-info'>Address Mail :</span>{userData.email} </p>
                <p className='details-items-info'><span className='items-contient-info'>Address :</span>{userData.adresse} </p>
                <p className='details-items-info'><span className='items-contient-info'>Phone Number:</span>{userData.telephone} </p>
            </fieldset>
        </div>
    );
};

export default ProfileDetail;
