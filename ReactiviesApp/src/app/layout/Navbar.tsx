import React from 'react';
import { Container, Menu, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';



export default function NavBar(){

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
            </Container>
        </Menu>

    )
}