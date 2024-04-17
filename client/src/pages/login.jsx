import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const history = useHistory();

    const errorMsg = (errorMessage) => {
        messageApi.error(errorMessage);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { username, password });
            if (response.status === 200) {
                console.log("success")
                history.push('/');
            } else {
                redirect('/login');
            }
        } catch (error) {
            if (error.response.status === 401) {
                const errorMessage = error.response.data;
                console.log(errorMessage);
                errorMsg(errorMessage);
            } else {
                console.error('Error during login:', error);
                console.log("An error occurred during login");
                errorMsg();
            }
        }
    };

    return (
        <Container>
            <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }} autoComplete="off">
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!', },]}>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit" onClick={handleLogin}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
};

export default Login;
