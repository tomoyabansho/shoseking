import React, { Component } from 'react';
import logo from '../image/logo.svg';
import '../style/App.css';
import Form from './form'
import ArchiveList from './archive_list'
import EventBus from 'eventbusjs'
import AppModel from '../model/AppModel'

class App extends Component {
  render() {
    const model = AppModel.generate()
    EventBus.dispatch('init')

    return (
      <div>
        <Form />
        <ArchiveList />
      </div>
    );
  }
}

export default App;
