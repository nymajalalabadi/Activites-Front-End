import React, { useEffect } from 'react'
import { Button, Card, Grid } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import { Link, useParams } from 'react-router-dom';    
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSideBar from './ActivityDetailsSideBar';


const ActivityDetails = () => {

  const { activityStore } = useStore();

  const { id } = useParams();

  useEffect(() => {
    if(id) {
        activityStore.loadActivity(id);
    }
  }, [id, activityStore.loadActivity]);

  if(activityStore.loadingInitial) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading activity details...</div>;
  }

  if(activityStore.selectedActivity === undefined || activityStore.selectedActivity.id !== id) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Activity not found</div>;
  }

  return (
    <Grid >
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activityStore.selectedActivity} />
        <ActivityDetailsInfo activity={activityStore.selectedActivity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSideBar />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails)