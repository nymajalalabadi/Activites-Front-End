import React from 'react'
import { Grid, List } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelecActivity: () => void
}

const ActivityDashboard = (props: Props) => {
  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
          {
            props.activities.map((activity) => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))
          }
        </List>
      </Grid.Column>
      <Grid.Column width='6'>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
