import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import EventBus from 'eventbusjs'
import { Button, Grid, Table } from 'semantic-ui-react'
import Archive from './archive'

import logo from '../image/logo.svg';

import '../style/archive_list.css';
import 'semantic-ui-css/semantic.min.css';

export default class ArchiveList extends Component {
  render() {
    EventBus.addEventListener('init', event => {
      this.isFetching = false
      this.archiveArray = []
    })
    EventBus.addEventListener('start load', event => {
      this.isFetching = true
    })

    EventBus.addEventListener('finish load', (event, archiveArray) => {
      this.isFetching = true
      this.archiveArray = archiveArray
      const root = document.getElementById('archive')
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      this.archiveArray.reverse().map(archive => {
        const element = document.createElement('div')
        ReactDOM.render(
          <Archive
            id={ archive._id }
            title={ archive.title }
            image_url={ archive.image_url }
            author={ archive.author }
            date={ archive.date }
            writer={ archive.writer }>{ archive.content }</Archive>, element)
        root.appendChild(element)
      })
    })
    return (<div className='archive_list'>
        <Table id='archive' stackable className='wrap_archive_list'></Table>
      </div>)
  }
}
