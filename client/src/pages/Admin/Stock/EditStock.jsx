import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import './stock.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const EditStock = () => {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');
  const [statut, setStatut] = useState('');
  const [PersMedicOblig, setPersMedicOblig] = useState(false);
  const [image, setImage] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMedicament = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/medicament/onemedicat/${id}`);
      const medicament = response.data;
      setNom(medicament.nom);
      setDescription(medicament.description);
      setPrix(medicament.prix);
      setQuantite(medicament.quantite);
      setStatut(medicament.statut);
      setPersMedicOblig(medicament.PersMedicOblig);
      setImage(medicament.image); // Optionnel : Charger l'image actuelle
      setIsLoading(false);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données du médicament :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicament();
  }, [id]);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('quantite', quantite);
    formData.append('statut', statut);
    formData.append('PersMedicOblig', PersMedicOblig);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:4000/medicament/edit/${id}`, formData);
      if (response.status === 200) {
        setShowSuccessAlert(true);
        navigate('/medicaments');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la modification du médicament :', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="admin_dashbord">
      <SideBar />
      <section id="content">
        <NavBarAdmin />
        <main>
          <h1>Modifier Médicament</h1>
          {showSuccessAlert && (
            <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
              Médicament modifié avec succès !
            </Alert>
          )}
          <Form className='form'>
            <table>
              <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prix</Form.Label>
                <Form.Control type="text" value={prix} onChange={(e) => setPrix(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantité</Form.Label>
                <Form.Control type="text" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prescription Obligatoire</Form.Label>
                <Form.Check type="checkbox" checked={PersMedicOblig} onChange={(e) => setPersMedicOblig(e.target.checked)} />
              </Form.Group>
              <Form.Group>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3%' }}>
                  <Form.Label>Image</Form.Label>
                  <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                  <Button
                    style={{ width: '80%' }}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    Upload file
                  </Button>
                </div>
              </Form.Group>
              <Form.Group style={{ marginTop: '10%' }}>
                <Button
                  style={{ backgroundColor: '#342E37', color: 'white', marginRight: '5%', width: '30%', marginTop: '5%' }}
                  onClick={() => navigate("/medicaments")}
                >
                  Cancel
                </Button>
                <Button style={{ backgroundColor: '#4169E1', color: 'white', width: '30%', marginTop: '5%' }} onClick={handleEdit}>Edit</Button>
              </Form.Group>
            </table>
          </Form>
        </main>
      </section>
    </div>
  );
};

export default EditStock;
