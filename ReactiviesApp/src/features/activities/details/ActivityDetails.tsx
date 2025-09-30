import React from 'react'
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from '../../../stores/store';


const ActivityDetails = () => {

  const { activityStore } = useStore();

  if(activityStore.selectedActivity === undefined) return <></>;

  return (
    <Card>
        <Image src={`/assets/categoryImages/${activityStore.selectedActivity?.category}.jpg`} />
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
                <Button basic color="blue" content='Edit' onClick={()=>activityStore.openForm(activityStore.selectedActivity?.id)} />
                <Button onClick={activityStore.cancelSelectActivity} basic color="grey" content='Cancel' />
            </Button.Group>
        </Card.Content>
    </Card>

  )
}

export default ActivityDetails