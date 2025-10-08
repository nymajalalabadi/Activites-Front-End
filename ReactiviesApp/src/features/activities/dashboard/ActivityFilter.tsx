import React from 'react'
import { Header, List, Menu, Segment } from 'semantic-ui-react'

const ActivityFilter = () => {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: '25px' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item name='all' />
        <Menu.Item name='past' />
        <Menu.Item name='future' />
        <Menu.Item name='hosting' />
      </Menu>
      <Header content='Activities' sub color='teal' />
      <Segment style={{ border: 'none' }}>
        <List>
          <List.Item>
            <List.Icon name='check' />
            <List.Content>All Activities</List.Content>
          </List.Item>
        </List>
      </Segment>    
    </>
  )
}

export default ActivityFilter
