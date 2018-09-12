import React, { Component } from 'react'
import { Media, Button } from 'react-bootstrap'
import EventBus from 'eventbusjs'

import '../style/archive.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Archive = ({ id, date, title, writer, ...props}) => {
  return (<Media className="article">
    <Media.Left><img src='https://picsum.photos/300/450' /></Media.Left>
    <Media.Body>
      <Media.Heading>{ title }<small>{ writer }</small></Media.Heading>
      <p>
        { props.children }
      </p>
      <p>{ date }</p>
      <Button onClick={()=>{
        EventBus.dispatch('delete', this, id)
      }}>Delete</Button>
    </Media.Body>
  </Media>)
}

export default Archive
