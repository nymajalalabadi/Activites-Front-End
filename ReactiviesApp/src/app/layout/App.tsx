import React, { useEffect, useState } from 'react'
import { GetAllActivitiesAsync } from '../../services/Activites';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react'
import './Style.css'
import { Activity } from '../../models/Activity';
import NavBar from './Navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    GetAllActivitiesAsync().then(data => setActivities(data));
  }, []);

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  };

  const cancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  return (
    <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={selectActivity}
        cancelSelecActivity={cancelSelectActivity}
      />
    </Container>
    </>
  )
}

export default App
