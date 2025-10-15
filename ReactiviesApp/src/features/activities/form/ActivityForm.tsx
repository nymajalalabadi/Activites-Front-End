import React, { useEffect, useState } from 'react'
import { Button, Form, Segment, Header, Icon, Grid } from "semantic-ui-react";
import { useStore } from '../../../stores/store';
import { useParams } from 'react-router-dom';
import { Activity } from '../../../models/Activity';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

interface Props{
  submitting: boolean;
}

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  date: Yup.string()
    .required('Date is required'),
  city: Yup.string()
    .required('City is required'),
  venue: Yup.string()
    .required('Venue is required')
});

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

  const handleSubmit = async (values: Activity) => {
    setSubmitting(true);
    try {
      if (values.id) {
        await activityStore.updateActivity(values);
        navigate(`/activities/${values.id}`);
      } else {
        const newActivity = { ...values, id: uuid() };
        await activityStore.createActivity(newActivity);
        navigate(`/activities/${newActivity.id}`);
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
    <>
      <style>
        {`
          .field-error {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 4px;
            font-weight: 500;
          }
        `}
      </style>
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

      <Formik
        initialValues={activity}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit} autoComplete='off'>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Form.Field style={{ marginBottom: '12px' }}>
                    <Form.Input
                      as={Field}
                      name='title'
                      placeholder='Enter activity title'
                      icon='tag'
                      iconPosition='left'
                      size='small'
                      required
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5'
                      }}
                    />
                    <ErrorMessage name="title" component="div" className="field-error" />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column width={8}>
                  <Form.Field style={{ marginBottom: '12px' }}>
                    <Form.Input
                      as={Field}
                      name='category'
                      placeholder='Enter category'
                      icon='list'
                      iconPosition='left'
                      size='small'
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5'
                      }}
                    />
                    <ErrorMessage name="category" component="div" className="field-error" />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Form.Field style={{ marginBottom: '12px' }}>
                    <Form.TextArea
                      as={Field}
                      name='description'
                      placeholder='Enter activity description'
                      rows={2}
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5',
                        resize: 'none'
                      }}
                    />
                    <ErrorMessage name="description" component="div" className="field-error" />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8}>
                  <Form.Field style={{ marginBottom: '12px' }}>
                    <Form.Input
                      as={Field}
                      name='date'
                      type='datetime-local'
                      icon='calendar'
                      iconPosition='left'
                      size='small'
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5'
                      }}
                    />
                    <ErrorMessage name="date" component="div" className="field-error" />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column width={8}>
                  <Form.Field style={{ marginBottom: '12px' }}>
                    <Form.Input
                      as={Field}
                      name='city'
                      placeholder='Enter city'
                      icon='building'
                      iconPosition='left'
                      size='small'
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5'
                      }}
                    />
                    <ErrorMessage name="city" component="div" className="field-error" />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Form.Field style={{ marginBottom: '15px' }}>
                    <Form.Input
                      as={Field}
                      name='venue'
                      placeholder='Enter venue address'
                      icon='map pin'
                      iconPosition='left'
                      size='small'
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d4d4d5'
                      }}
                    />
                    <ErrorMessage name="venue" component="div" className="field-error" />
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
          </FormikForm>
        )}
      </Formik>
    </Segment>
    </>
  )
}

export default ActivityForm