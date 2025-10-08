import React, { useState } from 'react'
import { Header, List, Menu, Segment } from 'semantic-ui-react'
import { Calendar } from 'react-calendar'

const ActivityFilter = () => {

  const [startDate, setStartDate] = useState(new Date());
  
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
      <Calendar onChange={(date) => setStartDate(date as Date)} value={startDate} />
    </>
  )
}

export default ActivityFilter
