import React, { useState } from 'react'
import axios from 'axios';
import {Form,Input,message,Button} from 'antd';
import styled from 'styled-components';




const Container = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 5%;
` ;

const Register = () => {
  
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [prenom,setPernom ]= useState('');
  const [adresse,setAdresse] = useState('');
  const [telephone,setTelephone] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const registerMsg = () => {
      messageApi.open({
        type: 'success',
        content: (
          <span>
              Account created successfully! You can <a href="/login">login</a>.
          </span>
      ),
      });
    };

  
  const failerMsg = () => {
    messageApi.open({
      type: 'error',
      content: 'username or email already used !',
    });
  };


  

  const handleRegister = async () =>{
    try{
        const response = await axios.post("http://localhost:4000/auth/register",{username,email,password,prenom,adresse,telephone});
        (response.status === 200) ? registerMsg():failerMsg();
    }catch(err){
      if (err.response.status === 400) {
            failerMsg();
    } else {
        console.log("An error occurred during login");
        failerMsg();
    }
    }
  }

  return (
  <Container>
      <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,flex:"100%"}} initialValues={{remember: true,}} autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{required: true,message: 'Please input your username!',},]}>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item label="Email" name="email"rules={[{type:'email',message: 'Please enter a valid email !',},{required: true,message: 'Please input your email',},]} hasFeedback >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{required: true,message: 'Please input your password!',},]}hasFeedback >
                <Input.Password />
            </Form.Item>

            <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback rules={[{ required: true, message: 'Please confirm your password!',},({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Thepassword that you entered do not match!'));
                    },
                  }),
                ]}>
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Prenom" name="Prenom" >
                <Input value={prenom} onChange={(e) => setPernom(e.target.value)} />
            </Form.Item>

            <Form.Item label="Adesse" name="Adresse" rules={[{required: true,message: 'Please input your Adresse!',},]}>
                <Input.TextArea value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            </Form.Item>

            <Form.Item label="Phone" name="Phone" >
                <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </Form.Item>
            {contextHolder}
            <Form.Item wrapperCol={{ offset: 8, span: 16,}}>
                <Button type="primary" htmlType="submit" onClick={handleRegister}>
                    Register
                </Button>
            </Form.Item>
  </Form>
</Container>
  )
}

export default Register