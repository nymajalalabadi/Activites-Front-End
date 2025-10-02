import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import { NavLink } from 'react-router-dom';



export default function NavBar(){
    const { activityStore } = useStore();
    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to='/'>
                    <img src="/assets/logo.png" alt="logo" />
                    Reactivites
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'>
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/createActivity'>
                    <button onClick={()=>activityStore.openForm()} className="ui positive button">Create Activity</button>
                </Menu.Item>
            </Container>
        </Menu>

    )
}