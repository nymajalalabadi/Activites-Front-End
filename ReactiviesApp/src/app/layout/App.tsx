import React, { useEffect, useState } from 'react'
import { CreateActivityAsync, UpdateActivityAsync, DeleteActivityAsync } from '../../services/Activites';
import { Container } from 'semantic-ui-react'
import './Style.css'
import { Activity } from '../../models/Activity';
import NavBar from './Navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';
import { useStore } from '../../stores/store.ts';
import { observer } from 'mobx-react-lite';

function App() {

  const { activityStore } = useStore();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    activityStore.loadActivities();

  }, [activityStore]);


  function handleDeleteActivity(id: string){
    setSubmitting(true);
    DeleteActivityAsync(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    });
  }


  return (
    <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
        activities={activityStore.activities}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
      />
    </Container>
    </>
  )
}

export default App
