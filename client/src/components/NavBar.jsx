import React, { useState } from 'react'
import styled from 'styled-components';
import {UserOutlined,SearchOutlined,ShoppingTwoTone} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import  {  Dropdown, Space,Input } from  'antd';


const Container = styled.div `
width: 100%;
`;

const Wrapper = styled.div `
    height: 40px;
    max-width: 100%;
    padding: 20px 60px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    `;

const Left = styled.div `
    flex: 1;
    display: flex;
    align-items: center;
`; 


const Center = styled.div`
  flex: 1;
  text-align: center;
`;


const Logo = styled.div `
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;`;
  
  
const MenuItems = styled.ul`
  display: flex;
`;

const MenuItem = styled.li `
  list-style: none;
  font-size: 20px;
  color:#3DB2FF;
  font-weight: bold;
  cursor: pointer;
  margin-left: 25px;
  &.active{
    color: black;
  }
  `;

  const iconStyle = {
    fontSize:"25px",
    color:"#3DB2FF",
    cursor:"pointer",
    marginRight:"35px"
    
  }


  const StyledLink = styled(Link) `
          text-decoration: none;
          color: inherit;
          &:hover{
    color: black ;
  }
  ` ;

    const SearchInput = styled(Input) `
      margin-right: 35px;
      width: 50%;
      border-radius: 25px;
      border-width:0;
      padding: 15px 28px;
      font-size: 12px;
      font-weight: 500;
      background-color: #F4FAFF;
      box-sizing: border-box;
      transition: all ease-in-out .3s;
    `;

      const suffix = (
        <SearchOutlined
          style={{
            fontSize: 16,
            color: '#1677ff',
            cursor:'pointer',
          }}
        />);


const items = [
  {
    label: (
      <StyledLink to="/login">
        Login
     </StyledLink>
    ),
    key: '0',
  },
  {
    label: (
      <StyledLink to="/regsiter">
        Register
     </StyledLink>
    ),
    key: '1',
  },
  {
    label: (
      <StyledLink to="/profile">
        Profile
     </StyledLink>
    ),
    key: '2',
  },{
    label: (
      <StyledLink to="/commandes">
        Mes Commandes
     </StyledLink>
    ),
    key: '3',
  },{
    label: (
      <StyledLink to="/logout">
        Déconnexion
     </StyledLink>
    ),
  },
  ];

const NavBar = () => {
  const [menu,setMenu] = useState("");
  return (
   <Container>
    <Wrapper>
        <Left>
          <Logo> <img src={logo} alt='' /> </Logo>
        </Left>
        <Center>
          <MenuItems>
            <MenuItem className={menu === "home" ? "active":""} onClick={() => setMenu('home')}> <StyledLink to="/"> Home </StyledLink> </MenuItem> 
            <MenuItem className={menu === "médicaments" ? "active":""}  onClick={ () => setMenu('médicaments') }> <StyledLink to ="/médicaments" className='link'> Médicaments </StyledLink>  </MenuItem>
            <MenuItem className={menu === "contact" ? "active":""}  onClick={ () => setMenu('contact')}> <StyledLink to ="/contact"> Contact </StyledLink>   </MenuItem>
            <MenuItem className={menu === "about" ? "active":""}  onClick={ () => setMenu('about')}> <StyledLink to="/about"> About Us </StyledLink>  </MenuItem>
          </MenuItems>
        </Center>
        
      <Right>
        <SearchInput placeholder='Search for products ...'  suffix={suffix} /> 
        <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <UserOutlined  style={iconStyle} />
                    </Space>
                </a>
        </Dropdown> 
        <ShoppingTwoTone  style={iconStyle}/>
      </Right>
      
    </Wrapper>
  </Container>
  )
}

export default NavBar