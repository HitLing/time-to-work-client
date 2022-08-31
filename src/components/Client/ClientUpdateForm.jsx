import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ClientsUrl } from '../../constats/api';

export default function ClientUpdateForm(props) {
    const initialFormData = Object.freeze({
        name: props.BASIC_DATA.name,
        surname: props.BASIC_DATA.surname,
        phone: props.BASIC_DATA.phone,
        email: props.BASIC_DATA.email
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const itemToUpdate = {
            clientId: props.BASIC_DATA.clientId,
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email
        };

        const url = ClientsUrl.API_URL_BASE+'/'+props.BASIC_DATA.clientId;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                props.onUpdated(itemToUpdate, responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h2>Редактирование клиента: {props.BASIC_DATA.name}.</h2>

            <TextField
                name="name"
                label="Имя"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="surname"
                label="Фамилия"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="phone"
                label="Телефон"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="email"
                label="Почта"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить изменения</Button>
            <Button variant="contained"  onClick={() => props.onUpdated(null, null)} color="secondary" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}