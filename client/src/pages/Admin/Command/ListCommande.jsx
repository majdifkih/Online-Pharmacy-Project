import React, { useEffect, useState } from 'react';
import './Commande.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Form } from 'react-bootstrap';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { message } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import SideBar from '../../../components/Admin/SideBar';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin';
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

const ListCommande = () => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();
  const listCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/listcommande');
      setRows(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    listCommandes();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const updateStatus = async (status, id) => {
    try {
      const response = await axios.put(`http://localhost:4000/changestatus/${id}`, { status });
      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row._id === id ? { ...row, status } : row
          )
        );
        messageApi.success('Status changed successfully');
      }
    } catch (error) {
      console.error('There was an error updating the status!', error);
      messageApi.error('There was an error updating the status!');
    }
  };

  return (
    <div className="admin_dashbord">
      {contextHolder}
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
                  <StyledTableCell>Prix Total</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell align='center' >Statut</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.userId.username}</StyledTableCell>
                      <StyledTableCell>{row.PrixTotal}</StyledTableCell>
                      <StyledTableCell>{new Date(row.date).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell align='right' style={{display:'flex',gap:'7%'}}>
                      <Tooltip title="More details">
                        <InfoIcon sx={{ fontSize: 30,cursor: 'pointer' }} color="action" onClick={()=>navigate(`/detailcommand/${row._id}`)}/>
                        </Tooltip>
                        <Form.Select
                          value={row.status}
                          onChange={(e) => updateStatus(e.target.value, row._id)}
                          className={`${
                            row.status === 'Pending'
                              ? 'status-en-cours'
                              : row.status === 'Accepted'
                              ? 'status-accepte'
                              : 'status-refuse'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </Form.Select>
                       
                       
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={5} align="center">
                      Aucune commande trouvée
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

export default ListCommande;
