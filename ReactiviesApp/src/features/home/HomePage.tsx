import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'

const HomePage = () => {

  const {userStore} = useStore();

  

  return (
    <div className="homepage-container">

      <Container
        fluid
        textAlign='center'
        className="hero-section"
      >
        {/* Main Hero Section */}
        <div>
          <div className="title-section">
            <Header as='h1' className="main-title">
              Activities
              <span className="gradient-text">
                Hub
              </span>
            </Header>

            <p className="hero-description">
              Discover extraordinary experiences, connect with like-minded people, and create unforgettable moments in your community.
            </p>
          </div>

          <div className="button-section">
            {
              userStore.isLoggedIn ? (
                <Button
                  as={Link}
                  to='/activities'
                  size='massive'
                  className="cta-button"
                >
                  <Icon name='rocket' style={{ marginRight: '0.5em' }} />
                  Activities
                </Button>
              ) : (
                <Button
                  as={Link}
                  to='/login'
                  size='massive'
                  className="cta-button"
                >
                  <Icon name='rocket' style={{ marginRight: '0.5em' }} />
                  Login
                </Button>
              )
            }
          </div>
        </div>

        {/* Feature Cards */}
        <div className="features-section">
          {[
            { icon: 'users' as const, title: 'Connect', desc: 'Build meaningful connections with people who share your passions', color: '#ff6b6b' },
            { icon: 'calendar alternate' as const, title: 'Organize', desc: 'Create and manage events that bring people together', color: '#4ecdc4' },
            { icon: 'star' as const, title: 'Discover', desc: 'Explore new activities and experiences in your area', color: '#45b7d1' }
          ].map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                feature.title === 'Connect' ? 'connect-card' :
                feature.title === 'Organize' ? 'organize-card' :
                'discover-card'
              }`}
            >
              <Icon
                name={feature.icon}
                size='huge'
                style={{ color: feature.color }}
                className="feature-icon"
              />
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-description">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default observer(HomePage)