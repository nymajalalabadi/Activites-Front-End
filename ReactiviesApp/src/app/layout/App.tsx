import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import './Style.css'
import NavBar from './Navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';
import { useStore } from '../../stores/store.ts';

function App() {

  const { activityStore } = useStore();
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    activityStore.loadActivities();

  }, [activityStore]);



  return (
    <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
        activities={activityStore.activities}
        submitting={submitting}
      />
    </Container>
    </>
  )
}

export default App
