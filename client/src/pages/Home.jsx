import React, { useEffect, useState } from 'react'
import {Carousel,Card,Col, Row} from 'antd';
import styled from 'styled-components'
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.div `` ;


const CarouselContainer = styled.div `
  width: 100%;
` ;


const CategoryContainer = styled.div ` 
  background-color: #E8F3FF;
  height: 450px;
  padding: 90px 50px;
`;


const InfoContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:650px;
    `
  
    ;

const Left = styled.div `
  width: 50%;
  display: flex;
  align-items: center;
  margin-left: 5%;
`
 ;
const Right = styled.div `
      width: 35%;
      margin-right:250px;
      & h4{
        color: #3DB2FF;
      }
      & h2{
        font-family:  Sans-serif;
        font-size: 32px;
        font-weight: 500;
        text-transform: capitalize;
        line-height: 40px;
        letter-spacing: .4px;
      }
     
   ` ;

const contentStyle = {
  height: '550px',
  color: '#fff',
  lineHeight: '550px',
  textAlign: 'center',
  background: '#3DB2FF',
};



const Home = () => {

  const [medicament,setMedicaments] = useState([]);
  useEffect(() => {
    const medics = async () => {
      try{
        const response = await axios.get('http://localhost:4000/medicament');
        const sortedMedicaments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestMedicaments = sortedMedicaments.slice(0, 3);
        setMedicaments(latestMedicaments);
      }catch(err){
        console.log (err.message);
      }
    };
    medics();
  },[])

  return (
  <Container> 
    <Header/>
    <CarouselContainer>
        <Carousel autoplay>
          {medicament.map((medic) => (
            <div key={medic._id}>
            <h3 style={contentStyle}>
              {medic.nom}
            </h3>
          </div>
          ))}
           
      </Carousel> 
    </CarouselContainer>
    <InfoContainer>
        <Left> <img src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_Bg_1.jpg" alt="" srcSet='' /></Left>
        <Right>  
          <h4> Welcome to Online Pharmacy </h4>
              <h2>Our Mission to Provide Medical Equipment. In Order To Improve People Healthcare.</h2>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut. Neque aliquam vestibulum morbi blandit cursus risus at. Duis at tellus at urna. Consequat ac felis donec et odio.</span>
         </Right>
    </InfoContainer>
    <Footer/>
  </Container> 
   
  )
}

export default Home