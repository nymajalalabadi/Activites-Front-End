import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'


const LoginForm = () => {

    const {userStore} = useStore();

  return (
    <Formik initialValues={{email: '', password: ''}}  onSubmit={(values) => userStore.login(values)}>
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} autoComplete='off' className='ui form'>
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <Button type="submit" positive content='Login' fluid loading={isSubmitting} />
        </Form>
      )}
    </Formik>
  )
}

export default observer(LoginForm)
