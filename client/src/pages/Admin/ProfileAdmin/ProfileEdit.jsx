import React, { useState } from 'react';
import { Form,InputGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { message } from 'antd';
import './profile.css';
const ProfileEdit = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAncienPassword, setShowAncienPassword] = useState(false);
    const [ancienPassword, setAncienPassword] = useState('');
    return (
        <div>
        <header style={{ marginTop: "2%" }}>
            <h3>Changer les informations</h3>
        </header>
        <div style={{ margin: "5% 20% 0 20%" }}>
            <Form.Label htmlFor="user">Utilisateur</Form.Label>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Changer utilisateur"
                   
                />
            </InputGroup>
            <Form.Label htmlFor="inputPassword5" style={{ marginTop: "5%" }}>Ancien mot de passe</Form.Label>
            <InputGroup>
                <Form.Control
                    type={showAncienPassword ? "text" : "password"}
                    placeholder="Ancien mot de passe"
                    
                    
                />
                <InputGroup.Text
                    className="password-icon"
                    onClick={() => setShowAncienPassword(!showAncienPassword)}
                >
                    <FontAwesomeIcon icon={showAncienPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
            </InputGroup>
            <Form.Label htmlFor="inputPassword5" style={{ marginTop: "5%" }}>Nouveau mot de passe</Form.Label>
            <InputGroup >
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Nouveau mot de passe"
                    
                    
                />
                <InputGroup.Text
                    className="password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
            </InputGroup>
            <Button variant="contained" color="primary"  style={{ margin: "5% 0 10%" }}>
                Confirmer
            </Button>
        </div>
    </div>
    );
};

export default ProfileEdit;