import { CircularProgress, Container, Grid } from '@mui/material';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import useAuth from '../hooks/useAuth';
import Job from '../pages/Job';
import JobList from '../pages/JobList';
import Client from '../pages/Client';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AppRoutes() {
    const auth = useAuth();

  return auth.isLoaded ? (
    <Container maxWidth="xl">
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Start />}/>
        <Route path="clients" element={
          <RequireAuth role={"admin"}>
            <Client />
          </RequireAuth>
        } />
        <Route path="jobs" element={
          <RequireAuth role={"admin"}>
            <Job />
          </RequireAuth>
        } />
        <Route path="jobList" element={
          <RequireAuth role={"user"}>
            <JobList />
          </RequireAuth>
        } />
    </Routes>
    </Container>
  ) : (
    <Container maxWidth="md">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
            <CircularProgress color="inherit" />
        </Grid>
        </Grid>
    </Container>
  )
}

  function Start() {
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
        </Grid>
    );
  }