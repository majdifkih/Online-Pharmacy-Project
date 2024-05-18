import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/Admin/SideBar';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './stock.css';
const StockDetail = () => {
    const [rows, setRows] = useState([]);
    const { id } = useParams();

    const MedicamentInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/medicament/onemedicat/${id}`);
            setRows(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    useEffect(() => {
        MedicamentInfo();
    }, [id]); 

    return (
        <div className="admin_dashbord">
            <SideBar />
            <section id="content">
                <NavBarAdmin />
                <main>
                
             
                         

                            
                           
                            <h2 className='title-Detailmedica'>{rows.nom}</h2>
                            
                            <fieldset className='info-group'>
                            <legend>Medicament Informations</legend>
                            <div className='fieldset-content'>
                            <img src={`http://localhost:4000/${rows.image}`} alt="loadImage" className='img-detail-medica'/>

                                <div>
                            <p className='details-items'><span className='items-contient'>Description :</span> {rows.description}</p>
                            <p className='details-items'><span className='items-contient'>Prix :</span> {rows.prix}</p>
                            <p className='details-items'><span className='items-contient'>Quantite :</span> {rows.quantite}</p>
                            <p className='details-items'><span className='items-contient'>Statut :</span> {rows.statut}</p>
                            <p className='details-items'><span className='items-contient'>Prescription obligation :</span> {rows.PersMedicOblig ? 'Oui' : 'Non'}</p>
                            </div>
                            </div>
                            </fieldset>
                        
                  

                </main>
            </section>
        </div>
    );
};

export default StockDetail;
