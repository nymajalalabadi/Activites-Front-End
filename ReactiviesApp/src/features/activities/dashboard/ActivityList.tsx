import React from 'react'
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';

interface Props {
    activities: Activity[];
    selectActivity:(id:string) => void;
}

const ActivityList = (props: Props) => {
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