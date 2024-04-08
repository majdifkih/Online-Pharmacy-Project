import React from 'react'
import {Carousel} from 'antd';
import styled from 'styled-components'



const Container = styled.div `` ;


const CarouselContainer = styled.div `
  width: 100%;
` ;


const InfoContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;`;

const Left = styled.div `
  flex:1;
  display: flex;
  align-items: center;
  margin-left: 5%;
`
 ;
const Right = styled.div `
   ` ;

const contentStyle = {
  height: '450px',
  color: '#fff',
  lineHeight: '450px',
  textAlign: 'center',
  background: '#3DB2FF',
};

const Home = () => {
  return (
  <Container> 
    <CarouselContainer>
        <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
      </Carousel> 
    </CarouselContainer>
    <InfoContainer>
        <Left> <img src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/h6_Bg_1.jpg" alt="" srcset="" /></Left>
        <Right>  <h4> Bienvenue dans Online Pharmacy </h4> </Right>
    </InfoContainer>
  </Container> 
   
  )
}

export default Home