import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const ProfileDetail = () => {
    const [userinfo, setUserinfo] = useState(null);

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
            setUserinfo(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        userInfo();
      }, []);

    if (!userinfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
             
            <fieldset className="info-group-compte">
               
                <legend>Informations Admin</legend>
                <p className='details-items-info'><span className='items-contient-info'>UserName :</span> {userinfo.username}</p>
                <p className='details-items-info'><span className='items-contient-info'>Address Mail :</span>{userinfo.email} </p>
                <p className='details-items-info'><span className='items-contient-info'>Address :</span>{userinfo.adresse} </p>
                <p className='details-items-info'><span className='items-contient-info'>Phone Number:</span>{userinfo.telephone} </p>
            </fieldset>
        </div>
    );
};

export default ProfileDetail;
