import React from 'react';
import EventBus from 'eventbusjs'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'react-bootstrap'

import 'semantic-ui-css/semantic.min.css';

const SearchBooksForm = () => {
  this.state = []
  const clear = () => {
    this.state.splice(0, this.state.length)
  }

  EventBus.addEventListener('update dropdown', (event, items) => {
    clear()
    console.log(items)
    items.map(item => {
      const data = {}
      data.key = item.id
      data.value = item.id
      data.flag = item.title
      data.text = `${item.title} (${item.author})`
      data.image = item.thumbnail
      this.state.push(data)
    })
  })
  const onChangeAction = (event, data) => {
    console.log(data)
    console.log(event)
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
