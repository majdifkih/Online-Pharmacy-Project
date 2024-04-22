import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card} from 'antd';
import styled from 'styled-components';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'; // Import Ant Design icons




const Container = styled.div `
    margin-top: 8px;
    display: flex;
  justify-content: center;
`;

const ProductsContainer = styled.div `
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin-top: 2%;
width: 100%;
max-width: 1200px; /* Adjust max-width as needed */
`;


const Name = styled.span `
    font-weight: 600;
    font-size: 18px;
` ;

const Price = styled.span `
    font-weight: 400;
    font-size: 14px;
`;

const StyledCard = styled(Card)`
  width: 250px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconsContainer = styled.div `
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;


const FilterContainer = styled.div ``;


const Medicaments = () => {
    const [medicaments, setMedicaments] = useState([]);
    const [error, setError] = useState(null);
  
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
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <Container>
        <ProductsContainer>
          {medicaments.map((medicament) => (
            <StyledCard key={medicament._id} hoverable style={{width: '250px', marginBottom: '20px',alignItems:'center'}} cover={<img alt="example" style={{width:'150px',marginTop:'25px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdCJXA2CFbzAuAEAh8IRuXx9dLGQcJitOwl1iK1f_Vtw&s" />}>
                <div>
                    Nom : <Name> {medicament.nom.toUpperCase()} </Name> <br />
                    Prix : <Price> {medicament.prix} DT </Price>
                </div>
                <IconsContainer>
                    <EyeOutlined  style={{fontSize:'25px',marginRight:'15px'}}/> 
                    <ShoppingCartOutlined style={{fontSize:'25px'}} />
                </IconsContainer>
            </StyledCard>
          ))}
        </ProductsContainer>
      </Container>
    );
}

export default Medicaments