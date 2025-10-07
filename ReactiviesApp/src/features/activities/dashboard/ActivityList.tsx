import React, { useState } from 'react'
import { Button, Card, Segment, Icon, Message, Label, Grid } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import { Link } from 'react-router-dom';
import { Activity } from '../../../models/Activity';

interface Props {
    submitting: boolean;
}

const ActivityList = (props: Props) => {
    const { activityStore } = useStore();
    const [target, setTarget] = useState('');


    const handleDeleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(id);
    }

    // If activities are loading
    if (activityStore.loadingInitial) {
        return (
            <Segment loading>
                <Message info>
                    <Message.Header>Loading activities...</Message.Header>
                    <p>Please wait while the activity list loads.</p>
                </Message>
            </Segment>
        );
    }

    // If no activities exist
    if (activityStore.activitiesByDate.length === 0) {
        return (
            <Segment placeholder>
                <Message info>
                    <Message.Header>No activities found</Message.Header>
                    <p>There are no activities to display. You can add a new activity.</p>
                </Message>
            </Segment>
        );
    }

    // Display activities in a clean, organized layout
    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#2185d0', marginBottom: '10px' }}>
                    <Icon name="list" style={{ marginRight: '10px' }} />
                    Activity List
                </h1>
                <p style={{ color: '#666', fontSize: '1.1em' }}>
                    {activityStore.activitiesByDate.length} {activityStore.activitiesByDate.length === 1 ? 'Activity' : 'Activities'} Found
                </p>
            </div>

            {/* Activities Grid */}
            <Grid stackable columns={2}>
                {activityStore.activitiesByDate.map((activity: Activity) => (
                    <Grid.Column key={activity.id}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header style={{ fontSize: '1.3em', marginBottom: '10px' }}>
                                    {activity.title || 'Untitled Activity'}
                                </Card.Header>

                                <Card.Meta style={{ marginBottom: '15px' }}>
                                    <Icon name="calendar" style={{ marginRight: '5px' }} />
                                    {activity.date ? new Date(activity.date).toLocaleDateString('en-US') : 'Date not specified'}
                                </Card.Meta>

                                <Card.Description style={{ marginBottom: '15px' }}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <Icon name="file text outline" style={{ marginRight: '8px' }} />
                                        {activity.description || 'No description available'}
                                    </div>
                                    <div>
                                        <Icon name="map marker alternate" style={{ marginRight: '8px' }} />
                                        {activity.city && activity.venue
                                            ? `${activity.city}, ${activity.venue}`
                                            : activity.city || activity.venue || 'Location not specified'
                                        }
                                    </div>
                                </Card.Description>

                                <Label color="blue" style={{ marginBottom: '15px' }}>
                                    <Icon name="tag" />
                                    {activity.category || 'Uncategorized'}
                                </Label>
                            </Card.Content>

                            <Card.Content extra>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.9em', color: '#666' }}>
                                        ID: {activity.id.slice(-4)}
                                    </div>
                                    <div>
                                        <Button
                                            as={Link}
                                            to={`/activities/${activity.id}`}
                                            color="blue"
                                            size="small"
                                            style={{ marginRight: '8px' }}
                                            loading={activityStore.loading}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            as={Link}
                                            to={`/manage/${activity.id}`}
                                            color="teal"
                                            size="small"
                                            style={{ marginRight: '8px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            name={activity.id}
                                            onClick={(event) => handleDeleteActivity(event, activity.id)}
                                            color="red"
                                            size="small"
                                            loading={props.submitting && target === activity.id}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}

export default observer(ActivityList)