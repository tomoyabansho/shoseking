import React, { Component } from 'react'
import { Container, Divider, Button, Header, Grid, Image, Segment, Table } from 'semantic-ui-react'
import EventBus from 'eventbusjs'

import 'semantic-ui-css/semantic.min.css';

const Archive = ({ id, date, title, writer, image_url, author, ...props}) => {
  const posted = new Date(date)

  this.editText = text => {
    const regExp = /(https?:\/\/\S+|\n)/;
    const regExpBr = /\n/;
    const regExpLink = /https?:\/\/\S+/;
    return text.split(regExp).map(function (line,i) {
        return line.match(regExpBr)
          ? (<br key={i} />)
          : line.match(regExpLink)
            ? (<a target="_blank" href={line} key={i}>{line}</a>)
            : line
    });
  }

  return (
    <div className='wrap_archive'>
      <Table.Row className="article">
        <Table.Cell width={2}>
          <Image src={ image_url } />
        </Table.Cell>
        <Table.Cell width={10} style={{
          margin: 16
        }}>
          <Header as='h2'>{ title }<small>: { author }</small></Header>
          <p> { this.editText(props.children) } </p>
          <p> <i> written by { writer } on { posted.getFullYear() }/{ posted.getMonth() }/{ posted.getDate() } </i></p>
          <Button onClick={()=>{
            EventBus.dispatch('delete', this, id)
          }}>Delete</Button>
        </Table.Cell>
      </Table.Row>
  </div>)
}

export default Archive
