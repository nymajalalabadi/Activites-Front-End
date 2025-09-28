import React, { useState } from 'react'
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';

interface Props {
    activities: Activity[];
    selectActivity:(id:string) => void;
    deleteActivity:(id:string) => void;
    submitting: boolean;
}

const ActivityList = (props: Props) => {
    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        props.deleteActivity(id);
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
                                <Button onClick={()=>{props.selectActivity(activity.id)}} floated="right" content='View' color="blue" />
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