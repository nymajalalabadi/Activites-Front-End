import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './Style.css' ;
import NavBar from './Navbar.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { useStore } from '../../stores/store';

function App() {

  const location = useLocation();
  const {userStore, commonStore} = useStore();

  useEffect(() => {
    if(commonStore.token) 
    {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
      });
    }
    else
    {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if(!commonStore.appLoaded) return <p>Loading...</p>;

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
