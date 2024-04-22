import React, { useState } from 'react';
import styled from 'styled-components';
import {FacebookOutlined,InstagramOutlined,WhatsAppOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';
import {QRCode} from 'antd';

const Container = styled.div `
    width: 100%;
    margin-top: 24px;
    background-color: white;
` ;
const Wrapper = styled.div `
    padding: 4rem 4rem;
    ` 
;

const Title = styled.h4 `
    color: #333333;
    font-weight: 600;
    font-size: 16px;
` ;

const FooterLinks = styled.div `
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    text-align: left;
    margin-bottom: 2rem;
`; 

const FooterLinksDiv = styled.div `
    width: 150px;
    margin: 1rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
` ;


const FooterLink = styled(Link) `
    text-decoration: none;
    color: #666666;
    margin-top: 5px;
    font-weight: 500;
    &:hover{
        color: #3DB2FF;
    }
` ;

const Line = styled.hr `
    color: #3DB2FF;
` ;

const FooterCopyRight = styled.div `
    margin-top: 5px;
    color:#666666;
    font-weight: 800;
    align-items: center;
    display: flex;
    justify-content: space-between;
` ;

const SocialMedia = styled.div `
    display: flex;
    flex-direction: row;
`;

const iconStyle = {
    fontSize:"25px",
    color:"#3DB2FF",
    cursor:"pointer",
    marginRight:"10px",

  }

const QRCodeContainer = styled.div`
    margin-left: auto; /* Push QRCode to the right */
`;

const Footer = () => {
    const [text, setText] =  useState('https://github.com/majdifkih/Online-Pharmacy-Project');
    return (
        <Container>
            <Wrapper>
                 <img src={logo} alt="" srcSet='' />
                <FooterLinks>
                        <FooterLinksDiv>
                            <Title>Informations</Title>
                                <FooterLink to="/about"> A Propos </FooterLink>
                                <FooterLink to="/contact"> Contact </FooterLink>
                                <FooterLink to ="https://www.google.com/maps/place/Pharmacie+Bastille/@48.8567106,2.3151411,13z/data=!4m10!1m2!2m1!1spharmacie+à+Paris,+France!3m6!1s0x47e67200f3bbf9f3:0xbba4e4375c4485ea!8m2!3d48.8543889!4d2.3701343!15sChpwaGFybWFjaWUgw6AgUGFyaXMsIEZyYW5jZVobIhlwaGFybWFjaWUgw6AgcGFyaXMgZnJhbmNlkgEIcGhhcm1hY3ngAQA!16s%2Fg%2F1tdzw0h6?entry=ttu.com" target='_blank'> Localisation  </FooterLink>
                         
                        </FooterLinksDiv>

                        <FooterLinksDiv>
                            <Title>Horaire du Travail</Title>
                               <FooterLink>  Lun-Ven : 8:30 - 18:30 </FooterLink>
                                <FooterLink> Sam : 09:00 - 13:00 </FooterLink>  
                        </FooterLinksDiv>

                        <FooterLinksDiv>
                        <Title>Lien Utiles</Title>
                                <FooterLink to="/login"> Login </FooterLink>
                                <FooterLink to="/register"> Register </FooterLink>
                                <FooterLink to ="/médicaments" target='_blank'> Médicaments </FooterLink>
                                <FooterLink to ="/mescommandes" target='_blank'> Mes commandes </FooterLink>
                        </FooterLinksDiv>

                        <FooterLinksDiv>
                            <Title> Suivi Nous Dans </Title>
                            <SocialMedia> 
                                <FacebookOutlined style={iconStyle} />
                                <InstagramOutlined  style={iconStyle} />
                                <WhatsAppOutlined style={iconStyle} /> 
                            </SocialMedia> 
                        </FooterLinksDiv>
                </FooterLinks>

                <Line />

                <FooterCopyRight>
                    <p>
                        Copyrights @{new Date().getFullYear()} .TEK-UP University
                    </p>
                    <QRCodeContainer> <QRCode value={text}  size={80} /> </QRCodeContainer>
                    
                </FooterCopyRight>
       
            </Wrapper>
        </Container>
    );
};

export default Footer;