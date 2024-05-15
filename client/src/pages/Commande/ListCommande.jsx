import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarAdmin from '../../components/Admin/NavBarAdmin';
import SideBar from '../../components/Admin/SideBar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3C91E6', // Couleur bleue
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ListCommande = () => {
  const [rows, setRows] = useState([]);
 
  const listCommandes = async () => {

    axios.get('http://localhost:4000/listcommande')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  useEffect(() => {
    listCommandes()
  }, []);

  return (
    <div className="admin_dashbord">
      <SideBar />

      <section id="content">
        <NavBarAdmin />
        <main>
          <h1>Liste des Commandes</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Client</StyledTableCell>
                  <StyledTableCell align="right">Prix Total</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell align="right">Statut</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row._id}
                    </StyledTableCell>
                    <StyledTableCell>{row.userId.username}</StyledTableCell>
                    <StyledTableCell align="right">{row.PrixTotal}</StyledTableCell>
                    <StyledTableCell>{new Date(row.date).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </section>
    </div>
  );
};

export default ListCommande;
