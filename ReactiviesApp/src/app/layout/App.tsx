import React, { useEffect, useState } from 'react'
import { GetAllActivitiesAsync, CreateActivityAsync, UpdateActivityAsync, DeleteActivityAsync } from '../../services/Activites';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react'
import './Style.css'
import { Activity } from '../../models/Activity';
import NavBar from './Navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard.tsx';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../stores/store.ts';

function App() {

  const { activityStore } = useStore();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    activityStore.loadActivities();

  }, [activityStore]);

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

  function handleCreateOrEditActivity(activity : Activity){

    setSubmitting(true);

    if(activity.id){
      UpdateActivityAsync(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }else{
      activity.id = uuid();
      CreateActivityAsync(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }

  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    DeleteActivityAsync(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    });
  }


  return (
    <>
    <NavBar openForm={handleFormOpen}/>
    <Container style={{marginTop: '7em'}}>
      <ActivityDashboard
        activities={activityStore.activities}
        selectedActivity={selectedActivity}
        selectActivity={selectActivity}
        cancelSelectActivity={cancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEditActivity={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
      />
    </Container>
    </>
  )
}

export default App
