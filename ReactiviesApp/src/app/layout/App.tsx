import React, { useEffect, useState } from 'react'
import { GetAllActivitiesAsync } from '../../services/Activites';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react'
import './Style.css'
import { Activity } from '../../models/Activity';

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]); 

  useEffect(() => {
    GetAllActivitiesAsync().then(data => setActivities(data));
  }, []);

  return (
    <>
    <Header as="h2" icon="users" content="Reactivites App"/>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {activities.map((activity : Activity) => (
          <div key={activity.id}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
          </div>
        ))}
        <button onClick={() => console.log(activities)}>
          Log Activities
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
