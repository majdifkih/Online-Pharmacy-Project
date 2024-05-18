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
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { Modal } from 'antd';

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
  const [id, setId] = useState('');
  const [sortOption, setSortOption] = useState('nom');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handledel = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/medicament/del/${id}`);
      setIsModalOpen(false);
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression du médicament :', error);
    }
  };

  const showModal = (id) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sortedAndFilteredMedicaments = rows.sort((a, b) => {
    if (sortOption === 'nom') {
      return a.nom.localeCompare(b.nom);
    } else if (sortOption === 'quantite') {
      return a.quantite - b.quantite;
    } else if (sortOption === 'prix') {
      return a.prix - b.prix;
    } else if (sortOption === 'status') {
      return a.statut.localeCompare(b.statut);
    }
    return 0;
  });

  return (
    <div className="admin_dashbord">
      <SideBar />
      <section id="content">
        <NavBarAdmin />
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Liste des Médicaments</h1>
            <div className='right-head'>
            <div className="sort-options-medica">
            <label className='medica-label'>Trier par :</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className='medica-select'
            >
              <option value="nom">Nom</option>
              <option value="quantite">Quantité</option>
              <option value="prix">Prix</option>
              <option value="status">Statut</option>
            </select>
          </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/addmedicament")}
              style={{ marginBottom: '2%' }}
            >
              Add Medicament
            </Button>
          </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Nom</StyledTableCell>
                  <StyledTableCell>Prix</StyledTableCell>
                  <StyledTableCell>Quantité</StyledTableCell>
                  <StyledTableCell>Statut</StyledTableCell>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAndFilteredMedicaments.length > 0 ? (
                  sortedAndFilteredMedicaments.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.nom}</StyledTableCell>
                      <StyledTableCell>{row.prix}</StyledTableCell>
                      <StyledTableCell>{row.quantite}</StyledTableCell>
                      <StyledTableCell>{row.statut}</StyledTableCell>
                      <StyledTableCell>
                        <img src={row.image} alt={row.nom} style={{ width: 50, height: 50 }} />
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ display: 'flex', gap: '5%' }}>
                        <div style={{ display: 'flex', gap: '5%' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/editmedicament/${row._id}`)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: '#f95454' }}
                            onClick={() => showModal(row._id)}
                          >
                            Delete
                          </Button>
                          <Tooltip title="More details">
                            <InfoIcon
                              sx={{ fontSize: 30, cursor: 'pointer' }}
                              color="action"
                              onClick={() => navigate(`/detailmedicament/${row._id}`)}
                            />
                          </Tooltip>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={7} align="center">
                      Aucun médicament trouvé
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            title="Delete Confirmation"
            open={isModalOpen}
            onOk={() => handledel(id)}
            okText="Confirm"
            onCancel={handleCancel}
          >
            <p className="alert-msg">Are you sure to delete the medication?</p>
          </Modal>
        </main>
      </section>
    </div>
  );
};

export default Stock;
