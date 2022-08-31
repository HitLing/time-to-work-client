import React, { useEffect, useState } from 'react'
import { JobsUrl } from '../constats/api';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from '@mui/system';

const JobList = () => {
    const [BASIC_DATA, SET_BASIC_DATA] = useState([]);
    const [SHOW_PAYMENT, SET_SHOW_PAYMENT] = useState(false);
    
    function getData() {
        const url = JobsUrl.API_URL_BASE;

        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            SET_BASIC_DATA(dataFromServer);
            })
        .catch((error) => {
            console.log(error);
            alert(error);
            });
    }

    useEffect(() => {
        getData()
    },[])   

    function buyJob() {
        
    }


  return (
    <Grid container spacing={1}>
        <Grid item xs={6}>
            <h2>Вакансии</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Зарплата</TableCell>
                    <TableCell>Описание</TableCell>
                    <TableCell>Задачи</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {BASIC_DATA.map((row) => (
                    <TableRow
                        key={row.jobId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.salary}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.description}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.jobContent}
                        </TableCell>                       
                        <TableCell component="th" scope="row">
                            <IconButton onClick={() => {SET_SHOW_PAYMENT(true)}}><AttachMoneyIcon /></IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Grid item xs={6}>
            <Box sx={{ m: 2 }}>
                {SHOW_PAYMENT}
            </Box>
        </Grid>
        </Grid>
    </Grid>
  )

  function onPayed(createdData, responseFromServer) {
    SET_SHOW_PAYMENT(false);

    if (createdData === null) {
    return;
    }

    alert(`${responseFromServer}`);

    getData();
}
}

export default JobList