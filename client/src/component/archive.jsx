import React, { Component } from 'react'
import { Container, Divider, Button, Header, Grid, Image, Segment, Table } from 'semantic-ui-react'
import EventBus from 'eventbusjs'

import '../style/archive.css'
import 'semantic-ui-css/semantic.min.css';

const Archive = ({ id, date, title, writer, image_url, author, ...props}) => {
  console.log(author)
  const posted = new Date(date)
  return (
    <div className='wrap_archive'>
      <Table.Row className="article">
        <Table.Cell width={2}>
          <Image src={ image_url } />
        </Table.Cell>
        <Table.Cell width={10} style={{
          margin: 16
        }}>
          <Header as='h2'>{ title }: { author }<small>{ writer }</small></Header>
          <p> { props.children } </p>
          <p> { posted.getFullYear() }/{ posted.getMonth() }/{ posted.getDate() } </p>
          <Button onClick={()=>{
            EventBus.dispatch('delete', this, id)
          }}>Delete</Button>
        </Table.Cell>
      </Table.Row>
  </div>)
}

export default Archive
