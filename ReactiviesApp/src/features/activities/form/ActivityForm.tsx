import React, { useState } from 'react'
import { Button, Form, Segment, Header, Icon, Grid } from "semantic-ui-react";
import { Activity } from '../../../models/Activity';

interface Props{
  selectedActivity: Activity | undefined;
  closeForm: () => void;
}

const ActivityForm = (props: Props) => {

  const initialState = props.selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    date: '',
    description: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', activity);
  };
  

  const handleCancel = () => {
    props.closeForm();
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
        <Icon name='plus circle' />
        Create Activity
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
                <Button type="submit" size='small' primary
                  style={{
                    borderRadius: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#2185d0'
                  }}
                >
                  <Icon name='save' />
                  Create
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