import React, { useState } from 'react'
import axios from 'axios';
import {Form,Input,message,Button} from 'antd';
import styled from 'styled-components';




const Container = styled.div`
    margin-top: 4%;
    display: flex;
    justify-content: center;
    align-items: flex-start;   
    height : 65vh;
`;

const Section = styled.div `
    width: 600px; 
    z-index: 1000;
    box-shadow: 0 10px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
` ;




const StyledInput = styled(Input) `
  border-radius: 25px;
  width: 100%;
` ;

const StyledPassInput = styled(Input.Password) `
   border-radius: 25px;
  width: 100%;
`;

const StyledTextAreaInput = styled(Input.TextArea) `
   border-radius: 25px;
  width: 100%;
`;


const Register = () => {
  
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [prenom,setPernom ]= useState('');
  const [adresse,setAdresse] = useState('');


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
        const response = await axios.post("http://localhost:4000/auth/register",{username,email,password,prenom,adresse});
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
    <img src="https://img.freepik.com/free-vector/employees-cv-candidates-resume-corporate-workers-students-id-isolate-flat-design-element-job-applications-avatars-personal-information-concept-illustration_335657-1661.jpg?w=740&t=st=1713364560~exp=1713365160~hmac=ac3f42003bd8db8bb9fa38ccc31365ce1e1a00ffb23603e57f097ce402e181c7" alt=""  style={{width:'450px'}} />
    <Section>
      <h2 style={{fontWeight:'600',marginBottom:'25px'}}> Register </h2>
      <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} style={{maxWidth: 600,flex:"100%"}} initialValues={{remember: true,}} autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{required: true,message: 'Please input your username!',},]}>
                <StyledInput value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item label="Email" name="email"rules={[{type:'email',message: 'Please enter a valid email !',},{required: true,message: 'Please input your email',},]} hasFeedback >
                <StyledInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{required: true,message: 'Please input your password!',},]}hasFeedback >
                <StyledPassInput />
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
                <StyledPassInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Prenom" name="Prenom" >
                <StyledInput value={prenom} onChange={(e) => setPernom(e.target.value)} />
            </Form.Item>

            <Form.Item label="Adesse" name="Adresse" rules={[{required: true,message: 'Please input your Adresse!',},]}>
                <StyledTextAreaInput value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            </Form.Item>

            {contextHolder}
            <Form.Item wrapperCol={{ offset: 8, span: 16,}}>
                <Button type="primary" htmlType="submit" onClick={handleRegister} style={{width:'70%',backgroundColor:'#3db2ff',borderRadius:'30px 30px 30px 30px'}}>
                    Register
                </Button>
            </Form.Item>
        </Form>
        </Section>
</Container>
  )
}

export default Register