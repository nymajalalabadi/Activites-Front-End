import React, { useState } from 'react'
import { Button, Form, Segment, Header, Grid, Icon, Divider } from "semantic-ui-react";

const ActivityForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel logic here
  };

  return (
    <Segment style={{ maxWidth: '800px', margin: '0 auto', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Header as='h2' textAlign='center' style={{ marginBottom: '2rem', color: '#2185d0' }}>
        <Icon name='plus circle' />
        Create New Activity
      </Header>

      <Form onSubmit={handleSubmit}>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='tag' /> Activity Title
                </label>
                <Form.Input
                  name='title'
                  placeholder='Enter activity title...'
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                  required
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='file alternate outline' /> Description
                </label>
                <Form.TextArea
                  name='description'
                  placeholder='Describe your activity in detail...'
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Divider horizontal style={{ margin: '2rem 0', color: '#666' }}>
            <Icon name='settings' /> Activity Details
          </Divider>

          <Grid.Row>
            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='list' /> Category
                </label>
                <Form.Input
                  name='category'
                  placeholder='e.g., culture, food, music...'
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                />
              </Form.Field>
            </Grid.Column>

            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='calendar' /> Date & Time
                </label>
                <Form.Input
                  name='date'
                  type='datetime-local'
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Divider horizontal style={{ margin: '2rem 0', color: '#666' }}>
            <Icon name='map marker alternate' /> Location
          </Divider>

          <Grid.Row>
            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='building' /> City
                </label>
                <Form.Input
                  name='city'
                  placeholder='Enter city name...'
                  value={formData.city}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                />
              </Form.Field>
            </Grid.Column>

            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Form.Field>
                <label style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                  <Icon name='map pin' /> Venue
                </label>
                <Form.Input
                  name='venue'
                  placeholder='Enter venue address...'
                  value={formData.venue}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e8e8e8',
                    padding: '12px',
                    fontSize: '16px'
                  }}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column width={16}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button
                  type="button"
                  onClick={handleCancel}
                  size='large'
                  style={{
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontWeight: '600',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    border: '2px solid #e9ecef'
                  }}
                >
                  <Icon name='cancel' />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size='large'
                  primary
                  style={{
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontWeight: '600',
                    backgroundColor: '#2185d0',
                    border: 'none'
                  }}
                >
                  <Icon name='save' />
                  Create Activity
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