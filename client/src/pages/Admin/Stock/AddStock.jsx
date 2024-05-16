import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import './stock.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';



const AddStock = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [quantite, setQuantite] = useState('');
  const [statut, setStatut] = useState('Disponible');
  const [PersMedicOblig, setPersMedicOblig] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('quantite', quantite);
    formData.append('statut', statut);
    formData.append('PersMedicOblig', PersMedicOblig);
    formData.append('image', image);
  
    try {
      
      const response = await axios.post('http://localhost:4000/medicament/add', formData);
  console.log("Ajout avec succés",response);
    } catch (error) {

      console.error('Une erreur s\'est produite lors de l\'ajout du médicament :', error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (

    <div className="admin_dashbord">
    <SideBar />
    <section id="content">
      <NavBarAdmin />
      <main>
        
          <h1>Ajouter Médicament</h1>
          <Form className='form'>
         <table>
      
          <Form.Label>Nom</Form.Label>
         
          <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
         
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
          <Form.Label>Statut</Form.Label>
          <Form.Control type="text" value={statut} onChange={(e) => setStatut(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prescription Obligatoire</Form.Label>
          <Form.Check type="checkbox" checked={PersMedicOblig} onChange={(e) => setPersMedicOblig(e.target.checked)} />
        </Form.Group>
        <Form.Group>
             
              <div style={{ display: 'flex', alignItems: 'center',gap:'3%' }}>
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
        <Form.Group style={{marginTop:'10%'}}>
        <Button 
        style={{backgroundColor:'#342E37',color:'white',marginRight:'5%',width:'30%',marginTo:'5%'}} 
        onClick={()=>navigate("/medicaments")}>
            Cancel
            </Button>
        <Button style={{backgroundColor:'#4169E1',color:'white',width:'30%'}} onClick={handleAdd}>Add</Button>
        </Form.Group>
      </table> 
      </Form>
      </main>
    </section>
  </div>
  );
};

export default AddStock;
