import React, { useState } from 'react'
import { Card, Icon, Button, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { Activity } from '../../../models/Activity';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';

interface ActivityListItemProps {
    activity: Activity;
    submitting: boolean;
}

const ActivityListItem = ({ activity, submitting }: ActivityListItemProps) => {
    const { activityStore } = useStore();
    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(id);
    }

  return (
    <Card fluid style={{ height: '100%' }}>
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
                                            loading={submitting && target === activity.id}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card.Content>
    </Card>
  )
}

export default observer(ActivityListItem)