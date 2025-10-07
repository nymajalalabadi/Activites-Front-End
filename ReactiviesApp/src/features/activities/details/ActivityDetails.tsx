import React, { useEffect } from 'react'
import { Button, Card } from "semantic-ui-react";
import { useStore } from '../../../stores/store';
import { Link, useParams } from 'react-router-dom';    


const ActivityDetails = () => {

  const { activityStore } = useStore();

  const { id } = useParams();

  useEffect(() => {
    if(id) {
        activityStore.loadActivity(id);
    }
  }, [id, activityStore.loadActivity]);

  if(activityStore.selectedActivity === undefined) return <></>;

  return (
    <Card>
        <img src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} />
        <Card.Content>
            <Card.Header>{activityStore.selectedActivity?.title}</Card.Header>
            <Card.Meta>
                <span>{activityStore.selectedActivity?.city}</span>
            </Card.Meta>
            <Card.Meta>
                <span>{activityStore.selectedActivity?.date}</span>
            </Card.Meta>
            <Card.Description>
                {activityStore.selectedActivity?.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra> 
            <Button.Group widths='2'>
                <Button basic color="blue" content='Edit'  as={Link} to={`/manage/${activityStore.selectedActivity?.id}`} />
                <Button  basic color="grey" content='Cancel' as={Link} to={`/activities`} />
            </Button.Group>
        </Card.Content>
    </Card>

  )
}

export default ActivityDetails