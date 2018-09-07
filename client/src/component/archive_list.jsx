import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import EventBus from 'eventbusjs'
import logo from '../image/logo.svg';
import '../style/app.css';

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
      this.archiveArray.map(archive => {
        const element = document.createElement('p')
        ReactDOM.render(<li>{`${archive.date}-${archive.writer}:${archive.content}`}</li>, element)
        root.appendChild(element)
      })
    })
    return (<div>
        <button onClick={() => EventBus.dispatch('fetch')}>fetch data</button>
        <ul id='archive'></ul>
      </div>)
  }
}
