import React, { Component } from 'react'
import { Media, Button } from 'react-bootstrap'
import EventBus from 'eventbusjs'

import '../style/archive.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Archive = ({ id, date, title, writer, ...props}) => {
  return (<Media>
    <Media.Left>{ date }</Media.Left>
    <Media.Body>
      <Media.Heading>{ title }<small>{ writer }</small></Media.Heading>
      <p>
        { props.children }
      </p>
      <Button onClick={()=>{
        EventBus.dispatch('delete', this, id)
      }}>Delete</Button>
    </Media.Body>
  </Media>)
}

export default Archive
