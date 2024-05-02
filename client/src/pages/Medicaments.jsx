import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const Container = styled.div`
    margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const ProductsContainer = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 2%;
width: 100%;
max-width: 1200px; /* Adjust max-width as needed */
`;


const Name = styled.span`
    font-weight: 600;
    font-size: 18px;
` ;

const Price = styled.span`
    font-weight: 400;
    font-size: 14px;
`;

const StyledCard = styled(Card)`
  width: 250px;
  margin-bottom: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;





const Medicaments = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/medicament');
        setMedicaments(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchMedicaments();
  }, []);

  const addToCart = async (idmedicament) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = (decodedToken.id);
      const response = await axios.post('http://localhost:4000/panier/addpanier', { iduser: userId, idmedicamnt:idmedicament });
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      setError(error);
    }

  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleViewDetails = (medicament) => {
    navigate(`/MedicDetail/${medicament._id}`);
  };

  return (
    <Container>
      <ProductsContainer>
        {medicaments.map((medicament) => (
          <StyledCard key={medicament._id} hoverable cover={<img alt="example" style={{ width: '150px', marginTop: '25px' }} src={medicament.image} />}>
            <div>
              Nom : <Name> {medicament.nom.toUpperCase()} </Name> <br />
              Prix : <Price> {medicament.prix} DT </Price>
            </div>
            <IconsContainer>
              <EyeOutlined style={{ fontSize: '25px', marginRight: '15px' }} onClick={() => handleViewDetails(medicament)} />
              <ShoppingCartOutlined style={{ fontSize: '25px' }} onClick={() => addToCart(medicament._id)} />
            </IconsContainer>
          </StyledCard>
        ))}
      </ProductsContainer>
    </Container>
  );
}

export default Medicaments