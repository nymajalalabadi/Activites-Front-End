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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    GetAllActivitiesAsync().then(data => setActivities(data));
  }, []);

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  };

  const cancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  function handleFormOpen(id?: string) {

    id ? selectActivity(id) : cancelSelectActivity();

    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }


  return (
    <>
    <NavBar openForm={handleFormOpen}/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={selectActivity}
        cancelSelectActivity={cancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
      />
    </Container>
    </>
  )
}

export default App
