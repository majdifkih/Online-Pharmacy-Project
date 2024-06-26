import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
import {UserOutlined,SearchOutlined,ShoppingTwoTone} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import  { Dropdown,Input,Badge,Drawer,message } from  'antd';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Button,Form,Slider,Upload } from "antd";
import { PlusOutlined,DeleteOutlined,RightCircleOutlined } from '@ant-design/icons';


const Container = styled.div `
width: 100%;
position: sticky;
`;

const Wrapper = styled.div `
    height: 80px;
    max-width: 100%;
    padding: 20px 60px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02); `;

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
  justify-content: flex-end;
  `;
  
  
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
    color: #666666;
  }
  `;

  const iconStyle = {
    fontSize:"25px",
    color:"#3DB2FF",
    cursor:"pointer",
    marginLeft:"25px"
  }


  const StyledLink = styled(Link) `
          text-decoration: none;
          color: inherit;
          &:hover{
          color: #666666 ;
  }
  ` ;

    const SearchInput = styled(Input) `
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




const NavBar = () => {
  const [menu,setMenu] = useState("");
  const [count,setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [cart,setCartItems] = useState([]);
  const [fileList,setFileList] = useState([]);
  const [innerDrawerOpen, setInnerDrawerOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


useEffect(()=>{
  fetchCartItems();
},[]);

useEffect(()=>{
  setCount(cart.length);
},[cart]);


const commandeMsg = () => {
  messageApi.open({
    type: 'success',
    content: (
      <span>
          Votre Achat a été effectué avec succès.
      </span>
  ),
  });
};
const fetchCartItems = async () =>{
try{
    const token=localStorage.getItem("token")
    const decodeToken = jwtDecode(token);
    const id = decodeToken.id;
    if (token){
    const response = await axios.get(`http://localhost:4000/panier/getpanier/${id}`);
    setCartItems(response.data);
  }
    }catch (err){
      console.log(err.message);
    }
  }
 

  const handleLogout = async ()=> {
    try{
        localStorage.removeItem("token");
        navigate('/login');
        window.location.reload();
    }catch(err){
      console.log(err.message);
    }
  }

  const handleSliderChange = (value, itemId) => {
    setQuantities(prevState => ({
      ...prevState,
      [itemId]: value
    }));
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

   const passerCommande = async ()=>{
    try{
      const token = localStorage.getItem("token");
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.id;
      const medicIds = cart.map(item => ({ medicId: item._id, quantity: quantities[item._id] || 1 }));
      const formData = new FormData();
      formData.append("userId",userId);
      formData.append("medicaments",JSON.stringify(medicIds))
      if (fileList.length > 0) {
      formData.append("ordonnance", fileList[0].originFileObj);
      }
      const response = await axios.post('http://localhost:4000/commande',formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },});
        if (response.status === 200) {
          const response = await axios.delete(`http://localhost:4000/panier/deleteAllItems`, {
            data: { userId }
          });
          commandeMsg();
          setCartItems([]);
        } else {
          console.log("can't pass command");
        }
      
      console.log(fileList);
    }catch (err){
      console.log(err.message);
    }
  } 

  const removeItemFromCart =  async (itemId) => {
  try {  
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const userId = decodeToken.id;
    await axios.delete("http://localhost:4000/panier/remove/",{ data: { userId, medicId: itemId } });
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    message.success('Item removed from cart successfully!');
  }catch(err){
    console.log(err.message)
  }
  };
  
  const UnAuthitems = [
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
        <StyledLink to="/register">
          Register
       </StyledLink>
      ),
      key: '1',
    }
    ];

    const AuthItmes = [      
      {
        label: (
          <StyledLink to="/profileadmin">
            Profile
         </StyledLink>
        ),
        key: '2',
      },{
        label: (
          <StyledLink to="/mescommandes">
            Mes Commandes
         </StyledLink>
        ),
        key: '3',
      },{
        label: (
          <StyledLink onClick={handleLogout} >
            Déconnexion
         </StyledLink>
        ),
      },
      ];

const items = token ? AuthItmes : UnAuthitems;
  
  return (
   <Container>
    <Wrapper>
        <Left>
          <Logo> <img src={logo} alt='' /> </Logo>
        </Left>
        <Center>
          <MenuItems>
            <MenuItem className={menu === "home" ? "active":""} onClick={() => setMenu('home')}> <StyledLink to="/"> Home </StyledLink> </MenuItem> 
            <MenuItem className={menu === "medics" ? "active":""}  onClick={ () => setMenu('medics') }> <StyledLink to ="/medics" className='link'> Médicaments </StyledLink>  </MenuItem>
            <MenuItem className={menu === "contact" ? "active":""}  onClick={ () => setMenu('contact')}> <StyledLink to ="/contact"> Contact </StyledLink>   </MenuItem>
            <MenuItem className={menu === "about" ? "active":""}  onClick={ () => setMenu('about')}> <StyledLink to="/about"> About Us </StyledLink>  </MenuItem>
          </MenuItems>
        </Center>
        
      <Right>
        <SearchInput placeholder='Search for products ...'  suffix={suffix} /> 
        <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                        <UserOutlined  style={iconStyle} />
                </a>
        </Dropdown>
        <Badge count={count} style={{ marginLeft: 10 }}>
          <ShoppingTwoTone  style={iconStyle} onClick={showDrawer}  />
        </Badge>
      </Right>
    </Wrapper>
    <Drawer title="Cart" onClose={onClose} open={open}>
    {cart.length > 0 ? (
    <>
      {cart.map((item) => (
        <div key={item._id}>
          <p style={{display:'flex',marginTop:'15%'}}>
           <img src={`http://localhost:4000/${item.image}`}  alt='img...' style={{width:'60px'}} /><span style={{fontWeight:'bold',marginLeft:'5%'}}>{item.nom}</span><DeleteOutlined  style={{color:'red',position:'absolute',right:'25px',fontSize:'20px'}} onClick={() => removeItemFromCart(item._id)} />
          </p>
          
        </div>
      ))}
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            <RightCircleOutlined  style={{fontSize:'35px',color:'#3DB2FF'}} onClick={() => setInnerDrawerOpen(true)} />
          </div>
    </>
  ) : (
    <p></p>
  )}

<Drawer title="Passer Commande Formulaire" onClose={() => setInnerDrawerOpen(false)} open={innerDrawerOpen}>
  {cart.map((item) => (
    <div key={item._id}>
      <p>
        <b>Médicament:</b> {item.nom} 
      </p>
      <p>
      <b>Prix:</b> {item.prix} DT
      </p>
      <Form.Item label="Quantité">
        <Slider onChange={(value) => handleSliderChange(value, item._id)} value={quantities[item._id]} min ={1} max={25} />
      </Form.Item>
      {item.PersMedicOblig ? (
        <Form.Item label="Ordonnance" valuePropName="fileList" required>
          <Upload 
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          accept=".pdf,.jpg,.png">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
      ) : null}
    </div>
  ))}
  <div style={{ position: 'absolute', bottom: '10px', right:'10px'}}>
    {contextHolder}
  <Button type='primary' onClick={passerCommande}> Passer Commande </Button>
  </div>
</Drawer>

</Drawer>
  </Container>
  )
}

export default NavBar