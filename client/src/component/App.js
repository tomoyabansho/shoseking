import React, { Component } from 'react';
import logo from '../image/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/App.css';
import UserForm from './form'
import ArchiveList from './archive_list'
import EventBus from 'eventbusjs'
import AppModel from '../model/AppModel'
import Content from './content'

class App extends Component {
  render() {
    const model = AppModel.generate()
    EventBus.dispatch('init')

    return (
      <div>
        <Content />
      </div>
    );
  }
}

export default App;
