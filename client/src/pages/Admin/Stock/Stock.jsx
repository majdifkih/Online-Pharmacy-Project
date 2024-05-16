import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
import SideBar from '../../../components/Admin/SideBar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3C91E6',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Stock = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const listMedicaments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/medicament');
      setRows(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    listMedicaments();
  }, []);



  return (
    <div className="admin_dashbord">
      <SideBar />
      <section id="content">
        <NavBarAdmin />
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Liste des Medicaments</h1>
            <Button variant="contained" color="primary" onClick={() => navigate("/addmedicament")}style={{ marginBottom: '2%'}}>Add Medicament</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Nom</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Prix</StyledTableCell>
                  <StyledTableCell>Quantité</StyledTableCell>
                  <StyledTableCell>Statut</StyledTableCell>
                  <StyledTableCell>Prescription Obligatoire</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.nom}</StyledTableCell>
                      <StyledTableCell>{row.description}</StyledTableCell>
                      <StyledTableCell>{row.prix}</StyledTableCell>
                      <StyledTableCell>{row.quantite}</StyledTableCell>
                      <StyledTableCell>{row.statut}</StyledTableCell>
                      <StyledTableCell>{row.PersMedicOblig ? "Oui" : "Non"}</StyledTableCell>
                      <StyledTableCell>
                        <img src={row.image} alt={row.nom} style={{ width: 50, height: 50 }} />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="contained" color="primary" onClick={()=>navigate(`/editmedicament/${row._id}`)}>Edit</Button>
                        <Button variant="contained" color="secondary">Delete</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={9} align="center">
                      Aucun médicament trouvé
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </section>


    </div>
  );
};

export default Stock;
