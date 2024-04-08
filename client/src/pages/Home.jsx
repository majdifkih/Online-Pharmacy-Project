import React from 'react'
import {Carousel} from 'antd';
import styled from 'styled-components'



const Container = styled.div `` ;


const CarouselContainer = styled.div `
  width: 100%;
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
  </Container> 
   
  )
}

export default Home