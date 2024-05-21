import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8%;
    margin-bottom: 8%;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    width: 80%;
    max-width: 800px;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const ImageContainer = styled.div`
    margin-right: 20px;
`;

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
`;

const TitleValueContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Value = styled.span`
    font-size: 18px;
    font-weight: 400;
`;

const Image = styled.img`
    max-width: 200px;
    border-radius: 10px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const LongText = styled.div`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
`;

const MedicamentDetail = () => {
    const { id } = useParams();
    const [medicament, setMedicament] = useState(null);

    useEffect(() => {
        const fetchMedicament = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/medicament/onemedicat/${id}`);
                setMedicament(response.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchMedicament();
    }, [id]);

    return (
        <div>
            <Header />
            <Container>
                {medicament ? (
                    <ContentWrapper>
                        <ImageContainer>
                            <Image src={`http://localhost:4000/${medicament.image}`} alt={medicament.nom} />
                        </ImageContainer>
                        <ContentContainer>
                            <TitleValueContainer>
                                <Title>Nom:</Title>
                                <Value>{medicament.nom}</Value>
                            </TitleValueContainer>
                            <TitleValueContainer>
                                <Title>Prix:</Title>
                                <Value>{medicament.prix} DT</Value>
                            </TitleValueContainer>
                            <TitleValueContainer>
                                <Title>Disponible:</Title>
                                <Value>
                                    {medicament.statut === 'Disponible' ? (
                                        <span style={{ color: 'green' }}>Oui</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>Non</span>
                                    )}
                                </Value>
                            </TitleValueContainer>
                            <LongText>
                                <Title>Description:</Title>
                                <Value>{medicament.description}</Value>
                            </LongText>
                            <LongText>
                                <Title>Ordonnance Obligatoire:</Title>
                                <Value>
                                    {medicament.PersMedicOblig ? (
                                        <span style={{ color: 'red' }}>
                                            Oui (vous devez scanner votre ordonnance pour que votre commande soit acceptée)
                                        </span>
                                    ) : (
                                        <span style={{ color: 'green' }}>Non</span>
                                    )}
                                </Value>
                            </LongText>
                        </ContentContainer>
                    </ContentWrapper>
                ) : (
                    <span>Aucune information trouvée pour ce produit</span>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default MedicamentDetail;
