import React from 'react'
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Space, Table, Tag } from 'antd';



const Container = styled.div `
    margin: 50px 50px 50px 50px;
`; 


const UserCommandes = () => {
let  [commandes, setCommandes] = useState([]);
let token = localStorage.getItem("token");


const fetchCommandes = async () => {
    try{
        const decodeToken = jwtDecode(token);
        const id = decodeToken.id;
        if (token){
            const response = await axios.get(`http://localhost:4000/commande/${id}`);
            setCommandes(response.data) 
        }
    } catch (err){
        console.log(err.message);
    }
}

  useEffect(() => { 
    fetchCommandes()
},[])

const columns = [
  {
    title: 'Medicaments',
    dataIndex: 'medicaments',
    key: 'medicaments',
    render: (medicaments) => (
      <>
        {medicaments.map(({ medicId, quantity }) => (
          <div key={medicId._id}>
            <b>{medicId.nom} *{quantity} </b>
          </div>
        ))}
      </>
    ),
  },
  {
    title: 'Date Commande',
    dataIndex: 'date',
    key: 'date',
    render: (date) => <b>{new Date(date).toLocaleDateString()}</b>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Pending' ? 'orange' : status === 'Accepted' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Total Price',
    dataIndex: 'PrixTotal',
    key: 'PrixTotal',
    render: (price) => <b> {`${price} DT`} </b>,
  },
 
];


  return (
    <>
  <Header />
   <Container>
    <Table dataSource={commandes} columns={columns} />    
   </Container>
  <Footer />
   </>
  )
}

export default UserCommandes