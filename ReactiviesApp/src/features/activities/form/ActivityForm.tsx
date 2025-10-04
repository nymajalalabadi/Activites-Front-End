import React, { useEffect, useState } from 'react'
import { Button, Form, Segment, Header, Icon, Grid } from "semantic-ui-react";
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import { Activity } from '../../../models/Activity';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface Props{
  submitting: boolean;
}

const ActivityForm = (props: Props) => {

  const { activityStore } = useStore();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const[activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    date: '',
    description: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if(id) {
      activityStore.loadActivity(id).then(activity => {
        if(activity) {
          setActivity(activity);
        }
      });
    }
  }, [id, activityStore.loadActivity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (activity.id) {
        await activityStore.updateActivity(activity);
        navigate(`/activities/${activity.id}`);

      } else {
        activity.id = uuid();
        await activityStore.createActivity(activity);
        navigate(`/activities/${activity.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleCancel = () => {
    activityStore.editMode = false;
    setActivity({
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: ''
    });
  };

  return (
    <Segment style={{
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e8e8e8',
      padding: '20px',
      margin: '0'
    }}>
      <Header as='h3' style={{
        color: '#2185d0',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '1.2em'
      }}>
        <Icon name={activity.id ? 'edit' : 'plus circle'} />
        {activity.id ? 'Edit Activity' : 'Create Activity'}
      </Header>

      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field style={{ marginBottom: '12px' }}>
                <Form.Input name='title' placeholder='Activity Title' value={activity.title} onChange={handleInputChange} icon='tag' iconPosition='left'
                  size='small' required style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5'
                  }}
                />
              </Form.Field>
            </Grid.Column>

            <Grid.Column width={8}>
              <Form.Field style={{ marginBottom: '12px' }}>
                <Form.Input name='category'  placeholder='Category' value={activity.category} onChange={handleInputChange} icon='list'
                  iconPosition='left' size='small' style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field style={{ marginBottom: '12px' }}>
                <Form.TextArea name='description' placeholder='Activity Description' value={activity.description} onChange={handleInputChange}
                  rows={2} style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5',
                    resize: 'none'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field style={{ marginBottom: '12px' }}>
                <Form.Input name='date' type='datetime-local' value={activity.date} onChange={handleInputChange}
                  icon='calendar' iconPosition='left' size='small'  style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5'
                  }}
                />
              </Form.Field>
            </Grid.Column>

            <Grid.Column width={8}>
              <Form.Field style={{ marginBottom: '12px' }}>
                <Form.Input name='city' placeholder='City' value={activity.city} onChange={handleInputChange} icon='building'
                  iconPosition='left' size='small' style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field style={{ marginBottom: '15px' }}>
                <Form.Input name='venue' placeholder='Venue Address' value={activity.venue} onChange={handleInputChange} icon='map pin'
                  iconPosition='left' size='small' style={{
                    borderRadius: '6px',
                    border: '1px solid #d4d4d5'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <Button type="button" onClick={handleCancel} size='small'
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    border: '1px solid #e9ecef',
                    padding: '8px 16px'
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size='small' primary disabled={submitting}
                  style={{
                    borderRadius: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#2185d0'
                  }}
                >
                  <Icon name='save' />
                  {submitting ? 'Saving...' : activity.id ? 'Update' : 'Create'}
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  )
}

export default ActivityForm