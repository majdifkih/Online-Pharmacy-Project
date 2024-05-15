import React from 'react'
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Space, Table, Tag } from 'antd';



const Container = styled.div `
    margin: 50px 50px 50px 50px;
`; 



const UserCommandes = () => {
    let [commandes, setCommandes] = useState([]);
    let token = localStorage.getItem("token");


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



    useEffect(() => { 
        const fetchCommandes = async () => {
            try{
                const decodeToken = jwtDecode(token);
                const id = decodeToken.id;
                if (token){
                    const response = await axios.get(`http://localhost:4000/commande/${id}`);
                    setCommandes(response.data);
                }
            } catch (err){
                console.log(err.message);
            }
        }
        fetchCommandes();
    }, [token]);

  return (
   <Container>
    <h2>Mes Commandes </h2>
        
   </Container>

  )
}

export default UserCommandes