import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { ClientsUrl } from '../../constats/api';

export default function ClientCreateForm(props) {
    const initialFormData = Object.freeze({
        name: "",
        surname: "",
        phone: "",
        email: ""
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

        const itemToCreate = {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email
        };

        const url = ClientsUrl.API_URL_BASE;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                props.onCreated(itemToCreate, responseFromServer);
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

            <h2>Создать нового клиента</h2>

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

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить клиента</Button>
            <Button variant="contained"  onClick={() => props.onCreated(null)} color="warning" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}