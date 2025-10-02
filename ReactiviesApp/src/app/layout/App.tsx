import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './Style.css' ;
import NavBar from './Navbar.tsx';
import { useStore } from '../../stores/store.ts';
import { Outlet } from 'react-router-dom';

function App() {

  const { activityStore } = useStore();


  useEffect(() => {

    activityStore.loadActivities();

  }, [activityStore]);



  return (
    <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
      <Outlet />
    </Container>
    </>
  )
}

export default App
