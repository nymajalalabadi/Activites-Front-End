import React from 'react'
import { Segment, Icon, Message, Header } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';
import ActivityListItem from './ActivityListItem';

interface Props {
    submitting: boolean;
}

const ActivityList = (props: Props) => {
    const { activityStore } = useStore();

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

    // Display activities grouped by date
    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#2185d0', marginBottom: '10px' }}>
                    <Icon name="calendar" style={{ marginRight: '10px' }} />
                    Activities by Date
                </h1>
                <p style={{ color: '#666', fontSize: '1.1em' }}>
                    {activityStore.activitiesByDate.length} {activityStore.activitiesByDate.length === 1 ? 'Activity' : 'Activities'} Found
                </p>
            </div>

            {/* Grouped Activities */}
            {activityStore.groupedActivities.map(([date, activities]) => (
                <div key={date} style={{ marginBottom: '40px' }}>
                    {/* Date Header */}
                    <Header as='h3' style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '15px 20px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}>
                        <Icon name="calendar outline" />
                        <Header.Content>
                            {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            <Header.Subheader style={{ color: 'rgba(255,255,255,0.8)' }}>
                                {activities.length} {activities.length === 1 ? 'Activity' : 'Activities'}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>

                    {/* Activities for this date */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '20px',
                        padding: '0 10px'
                    }}>
                        {activities.map((activity) => (
                            <ActivityListItem
                                key={activity.id}
                                activity={activity}
                                submitting={props.submitting}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default observer(ActivityList)