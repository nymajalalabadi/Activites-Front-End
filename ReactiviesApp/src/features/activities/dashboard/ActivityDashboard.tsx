import React from 'react'
import { Grid, List } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../stores/store';

interface Props {
    submitting: boolean;
}

const ActivityDashboard = (props: Props) => {

  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          <ActivityList submitting={props.submitting} />
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
          {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails/>}
          {activityStore.editMode && <ActivityForm submitting={props.submitting}/>}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
