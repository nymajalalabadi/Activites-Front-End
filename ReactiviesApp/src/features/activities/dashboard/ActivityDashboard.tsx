import React from 'react'
import { Grid, List } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void
}

const ActivityDashboard = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          <ActivityList activities={props.activities} selectActivity={props.selectActivity} />
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
          {props.selectedActivity && <ActivityDetails
              activity={props.selectedActivity}
              cancelSelectActivity={props.cancelSelectActivity}
          />}
          <ActivityForm />
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
