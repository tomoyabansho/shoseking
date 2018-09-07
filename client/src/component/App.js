import React, { Component } from 'react';
import logo from '../image/logo.svg';
import '../style/App.css';
import Form from './form'
import ArchiveList from './archive_list'

class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <ArchiveList />
      </div>
    );
  }
}

export default App;
