import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { JobsUrl } from '../../constats/api';

export default function JobCreateForm(props) {
    const initialFormData = Object.freeze({
        name: "",
        salary: "",
        description: "",
        jobContent: ""
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
            salary: formData.salary,
            description: formData.description,
            jobContent: formData.jobContent
        };

        const url = JobsUrl.API_URL_BASE;

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
            <h2>Создание нового курса</h2>

            <TextField
                name="name"
                label="Название курса"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="salary"
                label="Цена курса"
                value={formData.salary}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="description"
                label="Описание"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="jobContent"
                label="Содержание"
                value={formData.jobContent}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />           

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить курс</Button>
            <Button variant="contained"  onClick={() => props.onCreated(null)} color="warning" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}