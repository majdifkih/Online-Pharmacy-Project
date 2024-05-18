import React, { useEffect, useState } from 'react';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommandDetail = () => {
    const [commande, setCommande] = useState(null);
    const { id } = useParams();

    const fetchCommandeInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/onecommandinfo/${id}`);
            setCommande(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    useEffect(() => {
        fetchCommandeInfo();
    }, [id]); 

    return (
        <div className="admin_dashbord">
            <SideBar />
            <section id="content">
                <NavBarAdmin />
                <main>
                    {commande && ( 
                        <div>
                            <fieldset className='info-group'>
                                <legend>Command Informations</legend>
                                <p className='details-items'><span className='items-contient'>Client :</span> {commande.userId.username}</p>
                                <p className='details-items'><span className='items-contient'>Prix Total :</span> {commande.PrixTotal}</p>
                                <p className='details-items'><span className='items-contient'>Médicaments :</span>  <ul>
                                    {commande.medicaments.map((medicament, index) => (
                                        <li key={index}>
                                            {medicament.medicId?.nom} , {medicament?.quantity}
                                        </li>
                                    ))}
                                </ul></p>
                                <p className='details-items'><span className='items-contient'>Date :</span>{new Date(commande.date).toLocaleDateString()}</p>
                                <p className='details-items'><span className='items-contient'>Statut :</span> {commande.status}</p>
                            </fieldset>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default CommandDetail;
