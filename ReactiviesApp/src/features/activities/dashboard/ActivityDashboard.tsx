import React from 'react'
import { Grid, List } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';

interface Props {
    submitting: boolean;
}

const ActivityDashboard = (props: Props) => {


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
