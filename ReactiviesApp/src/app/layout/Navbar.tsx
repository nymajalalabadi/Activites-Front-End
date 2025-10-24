import React from 'react';
import { Container, Menu, Image, Button, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../stores/store';

export default function NavBar(){

    const {userStore:{user, logout}} = useStore();

    return (

        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to='/'>
                    <Image src="/assets/logo.png" alt="logo" />
                    Reactivites
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'>
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/createActivity'>
                <Button className="ui positive button">Create Activity</Button>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.avatr || "/assets/user.png"} avatar />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='My profile' icon='user' as={NavLink} to={`/profile/${user?.username}`} />
                            <Dropdown.Item text='Logout' icon='power' onClick={logout} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>

    )
}