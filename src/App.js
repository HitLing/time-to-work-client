import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, createTheme, Toolbar, Typography } from '@mui/material';
import useAuth from './hooks/useAuth';
import { AdminNavbar } from './components/Navbar/AdminNavbar';
import UserNavbar from './components/Navbar/UserNavbar';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0000ff',
    },
  },
});

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.logOut();
    navigate("/login");
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
         <Toolbar disableGutters>
          {auth.isLoaded &&
            (auth.user ? (
              <>
                {auth.userRole.includes('admin') ? (
                  <AdminNavbar />
                ):(
                  <UserNavbar />
                )}
				<Typography
            variant="h4"
            noWrap
            sx={{ mr: 1, display: 'flex', fontFamily: "fantasy" }}
            component="div"
          >
          TimeToWork
          </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "right"}}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={onLogOut}
                  >
                    Выйти
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link} 
                    to={'/login'}
                  >
                    Войти
                  </Button>

                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link} 
                    to={'/register'}
                  >
                    Регистрация
                  </Button>
                </Box>
              </>
            ))
          }
         </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>

      <AppRoutes />
    </div>
  );
}
export default App;
