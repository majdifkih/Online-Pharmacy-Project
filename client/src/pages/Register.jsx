import React, { useState } from 'react'
import axios from 'axios';


const Register = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [prenom,setPernom ]= useState('');
  const [adresse,setAdresse] = useState('');
  const [telephone,setTelephone] = useState('');

  const handleRegister = async () =>{
    try{
        const response = await axios.post("http://localhost:4000/auth/register",{username,email,password,prenom,adresse,telephone});
        console.log(response.data);
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div>
      <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" value={prenom} onChange={(e) => setPernom(e.target.value)} />
      <input type="text" value={adresse}  onChange={(e) => setAdresse(e.target.value)} />
      <input type="number"  value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      <button onClick={handleRegister}> Register </button>
    </div>
  )
}

export default Register