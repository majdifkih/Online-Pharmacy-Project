
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';



const Container = styled.div  ` 
    display: flex;
    justify-content: center;
    margin-top: 8%;
` ;

const ContentContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
    margin-left: 20px;
` ;

const ImageContainer = styled.div`
    margin-right: 20px; 
`;

const Title = styled.span `
    font-size: 20px;
    font-weight:600;
` ;

const TitleValueContainer = styled.div `
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Value = styled.span `
    font-size: 18px;
    font-weight: 400;
` 

const Image = styled.img`
    max-width: 200px;
    margin-right: 20px;
`;

const MedicamentDetail = () => {
    const {id} = useParams()
    const [medicament,setMedicament] = useState(null);
    useEffect(()=>{
        const oneMedic = async () =>{
            try {
                const response = await axios.get(`http://localhost:4000/medicament/onemedicat/${id}`);
                setMedicament(response.data);
            }catch (err){
                console.log(err.message);
            }
        };
        oneMedic();
    })
  return (
    <div>
      <Header/>
    <Container>
        {medicament ? (
            <div style={{ display: 'flex' }}>
              <ImageContainer> <Image src={medicament.image} /> </ImageContainer>  
                <ContentContainer>
                  <TitleValueContainer> <Title> Nom:  </Title>  <Value> {medicament.nom} </Value>  </TitleValueContainer>  
                   <TitleValueContainer> <Title> Prix: </Title> <Value> {medicament.prix} DT </Value> </TitleValueContainer> 
                   <TitleValueContainer> <Title> Disponible: </Title>  <Value> {medicament.statut === 'Disponible' ? (
                            <span style={{ color: 'green' }}>Oui</span>
                        ) : (
                            <span style={{ color: 'red' }}>Non</span>
                            )}  
                                </Value> </TitleValueContainer> 
                  <TitleValueContainer> <Title> Description  : </Title> <Value>{medicament.description} </Value> </TitleValueContainer>   
                   <TitleValueContainer>  <Title> Ordonnace Obligatoire : </Title>  {medicament.PersMedicOblig === true ? (
                            <span style={{color:'red'}}> Oui (vouse devez scanner votre ordonnace pour que votre commande sera accepté) </span>
                    ) : (
                            <span style={{color:'green'}}> Non </span>
                    )}
                    </TitleValueContainer>
                </ContentContainer>
            </div>
            ) : (
        <span>No Informations found for this product </span>
      )}
    </Container>
      <Footer/>
    </div>
  )
}

export default MedicamentDetail