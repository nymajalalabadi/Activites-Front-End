import React, { useState } from 'react'
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';
import { useStore } from '../../../stores/store';

interface Props {
    activities: Activity[];
    submitting: boolean;
}

const ActivityList = (props: Props) => {
    const { activityStore } = useStore();

    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(id);
    }

  return (
    <Segment>
            <Item.Group divided>
                {props.activities.map(activity => (
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as='a'>{activity.title}</ItemHeader>
                            <ItemMeta>{activity.date}</ItemMeta>
                            <ItemDescription>
                                <div>{activity.description}</div>
                                <div>{activity.city} , {activity.venue}</div>
                            </ItemDescription>
                            <ItemExtra>
                                <Button onClick={()=>{activityStore.selectActivity(activity.id)}} floated="right" content='View' color="blue" loading={activityStore.loading} />
                                <Button name={activity.id} onClick={(event) => handleDeleteActivity(event, activity.id)} floated="right" content='Delete' 
                                color="red" loading={props.submitting && target === activity.id} />
                                <Label basic content={activity.category} />
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
    </Segment>

  )
}

export default ActivityList