import React, { Component } from 'react'
import { Media } from 'react-bootstrap'

import '../style/archive.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Archive = ({ date, title, writer, ...props}) => (
  <Media>
    <Media.Left>{ date }</Media.Left>
    <Media.Body>
      <Media.Heading>{ title }</Media.Heading>
      <p>
        { props.children }
      </p>
    </Media.Body>
  </Media>
)

export default Archive
