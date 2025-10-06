import React, { useEffect } from 'react'
import { Grid, List } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import { useStore } from '../../../stores/store';

interface Props {
    submitting: boolean;
}

const ActivityDashboard = (props: Props) => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading activities...</div>;
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          <ActivityList submitting={props.submitting} />
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
          <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
