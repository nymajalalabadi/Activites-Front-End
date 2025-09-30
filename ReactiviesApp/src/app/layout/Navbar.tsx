import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';



export default function NavBar(){
    const { activityStore } = useStore();
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    Reactivites
                </Menu.Item>
                <Menu.Item name='Activities'>
                </Menu.Item>
                <Menu.Item name='Activities'>
                    <button onClick={()=>activityStore.openForm()} className="ui positive button">Create Activity</button>
                </Menu.Item>
            </Container>
        </Menu>

    )
}