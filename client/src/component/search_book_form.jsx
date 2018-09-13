import React from 'react';
import EventBus from 'eventbusjs'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'react-bootstrap'

import 'semantic-ui-css/semantic.min.css';

const SearchBooksForm = () => {
  this.state = []
  const onChangeAction = (event, data) => {
    EventBus.dispatch('select book', this, data.value)
  }
  const onSearchChangeAction = (event, data) => {
    EventBus.dispatch('change title', this, data.searchQuery)
  }
  return (
    <div>
      <Dropdown
        placeholder='タイトルを入力してください'
        onChange={ onChangeAction }
        onSearchChange={ onSearchChangeAction }
        fluid
        search
        selection
        options={ this.state } />
    </div>)
}

export default SearchBooksForm
