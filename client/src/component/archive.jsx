import React, { Component } from 'react'
import { Container, Divider, Button, Header, Grid, Image } from 'semantic-ui-react'
import EventBus from 'eventbusjs'

import '../style/archive.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Archive = ({ id, date, title, writer, image_url, author, ...props}) => {
  console.log(image_url)
  return (
    <p>
      <Grid.Row className="article">
        <Grid.Column width={3}>
          <Image src={ image_url } />
        </Grid.Column>
        <Grid.Column width={13}>
          <Header as='h2'>{ title }<small>{ writer }</small></Header>
          <p> { props.children } </p>
          <p> { date } </p>
          <Button onClick={()=>{
            EventBus.dispatch('delete', this, id)
          }}>Delete</Button>
        </Grid.Column>
      </Grid.Row>
  </p>)
}

export default Archive
