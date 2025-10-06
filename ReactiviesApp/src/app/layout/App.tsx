import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './Style.css' ;
import NavBar from './Navbar.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-background">
      {location.pathname === '/' ? <HomePage/> : (
        <>
          <NavBar/>
          <Container fluid className="page-container">
            <Outlet />
          </Container>
        </>
      )}
    </div>
  )
}

export default App
