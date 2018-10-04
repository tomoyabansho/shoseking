import React, { Component } from 'react';
import logo from '../image/logo.svg';
import UserForm from './form'
import ArchiveList from './archive_list'
import EventBus from 'eventbusjs'
import AppModel from '../model/AppModel'

import '../style/content.css'

class Content extends Component {
  render() {
    return (
      <div id='content'>
        <UserForm />
        <ArchiveList />
      </div>
    );
  }
}

export default Content;
