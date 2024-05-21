import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUsContainer = styled.div`
  text-align: center;
  width: 50%;
  align-self: center;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  box-sizing: border-box; /* Include padding in the element's total width and height */
`;

const Title = styled.h1 `
  margin-bottom: 15px;
  margin-top: 25px;
  color: #1677ff;
  font-weight: 800;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ContactUsPage = () => (
  <>
  <Header />
  <PageContainer>
  <ContactUsContainer>
    <ContactForm className='form-control'>
    <Title>Contact Us</Title>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" className='form-control' />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" className='form-control' />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" rows="4" className='form-control' />
      <button type="submit">Submit</button>
    </ContactForm>
  </ContactUsContainer>
  </PageContainer>
  <Footer />
  </>
);

export default ContactUsPage;
