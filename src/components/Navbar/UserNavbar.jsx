import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'/jobList'}
        >
            Вакансии
        </Button>
    </Box>
  )
}

export default UserNavbar