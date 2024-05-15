import React from 'react';
import styled from 'styled-components';

const ContactUsContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
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
  <ContactUsContainer>
    <h1>Contact Us</h1>
    <ContactInfo>
      <p>Email: example@example.com</p>
      <p>Phone: 123-456-7890</p>
      <p>Address: 123 Main St, City, Country</p>
    </ContactInfo>
    <ContactForm>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" rows="4" />
      <button type="submit">Submit</button>
    </ContactForm>
  </ContactUsContainer>
);

export default ContactUsPage;
