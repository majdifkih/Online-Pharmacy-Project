import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Table, Tag, Button, Modal } from 'antd';

const Container = styled.div`
  margin: 50px 50px 50px 50px;
`;

const UserCommandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');

  const fetchCommandes = async () => {
    try {
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.id;
      if (token) {
        const response = await axios.get(`http://localhost:4000/commande/${userId}`);
        setCommandes(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const delcommande = async (idcommande) => {
    try {
      await axios.delete(`http://localhost:4000/delcommande/${idcommande}`);
      setCommandes((prevCommandes) => prevCommandes.filter(commande => commande._id !== idcommande));
      setOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const showModal = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Medicaments',
      dataIndex: 'medicaments',
      key: 'medicaments',
      render: (medicaments) => (
        <>
          {medicaments.map(({ medicId, quantity }) => (
            <div key={medicId}>
              <b>{medicId?.nom} *{quantity} </b>
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
      render: (price) => <b>{`${price} DT`}</b>,
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => showModal(record._id)} danger>
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container>
        <Table dataSource={commandes} columns={columns} rowKey="_id" />
      </Container>
      <Footer />

      <Modal
        title="Cancel Confirmation"
        open={open}
        onOk={() => delcommande(id)}
        okText="Confirm"
        onCancel={handleCancel}
      >
        <p>Are you sure you want to cancel the command?</p>
      </Modal>
    </>
  );
};

export default UserCommandes;
