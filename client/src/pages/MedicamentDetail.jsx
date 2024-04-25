
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div  ` 
    display: flex;
    justify-content: center;
    margin-top: 8%;
` ;

const Title = styled.span `
    font-size: 20px;
    font-weight:600;
` ;

const Value = styled.span `
    font-size: 18px;
    font-weight: 400;
` 

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
    <Container>
        {medicament ? (
            <div>
                <Title> Nom:  </Title>  <Value> {medicament.nom} </Value>  <br />
                <Title>  Prix: </Title> <Value> {medicament.prix} DT </Value>  <br /> 
                <Title> Disponible: </Title>  <Value> {medicament.statut === 'Disponible' ? (
                        <span style={{ color: 'green' }}>Oui</span>
                    ) : (
                        <span style={{ color: 'red' }}>Non</span>
                         )}  
                            </Value> <br />
                <Title> Description  : </Title> <Value>{medicament.description} </Value>   
            </div>
            ) : (
        <span>No Informations found for this product </span>
      )}
    </Container>

  )
}

export default MedicamentDetail