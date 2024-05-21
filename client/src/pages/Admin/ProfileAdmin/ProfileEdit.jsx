import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { message } from 'antd';
import './profile.css';

const ProfileEdit = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAncienPassword, setShowAncienPassword] = useState(false);
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
            setUserData((prevUserData) => ({
                ...prevUserData,
                username: response.data.username,
                email: response.data.email,
                adresse: response.data.adresse,
                telephone: response.data.telephone,
            }));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        userInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            await axios.put(`http://localhost:4000/editprofil/${userId}`, userData);
            message.success('Profil mis à jour avec succès!');
        } catch (err) {
            console.error(err.message);
            message.error('Erreur lors de la mise à jour du profil.');
        }
    };

    return (
        <div>
            <header style={{ marginTop: "2%" }}>
                <h3>Changer les informations</h3>
            </header>
            <div style={{ margin: "5% 20% 0 20%" }}>
                <Form.Label htmlFor="user">UserName</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Change UserName"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </InputGroup>
                <Form.Label htmlFor="inputPassword5" style={{ marginTop: "5%" }}>Ancien password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showAncienPassword ? "text" : "password"}
                        placeholder="Ancien password"
                        name="ancienPassword"
                        value={userData.ancienPassword}
                        onChange={handleChange}
                    />
                    <InputGroup.Text
                        className="password-icon"
                        onClick={() => setShowAncienPassword(!showAncienPassword)}
                    >
                        <FontAwesomeIcon icon={showAncienPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                </InputGroup>
                <Form.Label htmlFor="inputPassword5" style={{ marginTop: "5%" }}>New password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleChange}
                    />
                    <InputGroup.Text
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </InputGroup.Text>
                </InputGroup>
                <Form.Label htmlFor="email">Email</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="email"
                        placeholder="Change Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </InputGroup>
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="number"
                        placeholder="Change Phone Number"
                        name="telephone"
                        value={userData.telephone}
                        onChange={handleChange}
                    />
                </InputGroup>
                <Form.Label htmlFor="address">Address</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Change Address"
                        name="adresse"
                        value={userData.adresse}
                        onChange={handleChange}
                    />
                </InputGroup>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: "5% 0 10%" }}>
                    Confirmer
                </Button>
            </div>
        </div>
    );
};

export default ProfileEdit;
