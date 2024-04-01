import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:4000/profil/${userId}`);
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const userIdFromLocalStorage = localStorage.getItem("user");
        if (userIdFromLocalStorage) {
            setUserId(userIdFromLocalStorage);
        }
        
        fetchUser();
    }, []);

    return (
        <div>
            <h1>HELLO</h1>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <p>{user.prenom}</p>
                    <p>{user.adresse}</p>
                    <p>{user.telephone}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default Profile;
