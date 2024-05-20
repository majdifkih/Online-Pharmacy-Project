import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, message } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.div`
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 65vh;
`;

const Section = styled.div`
    width: 600px;
    z-index: 1000;
    box-shadow: 0 10px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    margin-bottom: 25px;
    width: 200px;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const errorMsg = (errorMessage) => {
        messageApi.error(errorMessage);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { username, password }, { withCredentials: true });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userRole = decodedToken.role; 
                if (userRole === 'admin') {
                    navigate("/dash");
                    window.location.reload();
                } else if (userRole === 'client') {
                    navigate("/");
                    window.location.reload();
                }
            } else {
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const errorMessage = error.response.data;
                errorMsg(errorMessage);
            } else {
                console.error('Error during login:', error);
                errorMsg('An error occurred during login');
            }
        }
    };
    return (
        <div>
            <Header />
            <Container>
                <Section>
                    <Image src="https://themebeyond.com/html/yed/img/images/contact_img.png" alt="" />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} style={{ borderRadius: '25px', width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderRadius: '25px', width: '100%' }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {contextHolder}
                            <Button type="primary" htmlType="submit" style={{ width: '50%', backgroundColor: '#3db2ff', borderRadius: '30px' }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Section>
            </Container>
            <Footer />
        </div>
    );
};

export default Login;
