import React from 'react';
import EventBus from 'eventbusjs'
import { Dropdown, Button } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';

const SearchBooksForm = () => {
  this.state = []
  this.execute = new Date()
  const clear = () => {
    this.state.splice(0, this.state.length)
  }

  EventBus.addEventListener('update dropdown', (event, items) => {
    clear()
    items.map(item => {
      const data = {}
      data.key = item.id
      data.value = {
        title: item.title,
        image: item.thumbnail,
        author: item.author
      }
      data.flag = item.title
      data.text = `${item.title} (${item.author})`
      data.image = item.thumbnail
      this.state.push(data)
    })
  })
  const handleChangeEvent = (event, {value}) => {
    console.log(value)
    EventBus.dispatch('select book', this, value)
  }
  const handleSearchChangeEvent = (event, data) => {
    this.query = data.searchQuery
    if(!this.first){
      setInterval(() => {
        if(this.query != '' && (!this.prequery || this.prequery != this.query)){
          EventBus.dispatch('search books', this, this.query)
        }
        this.prequery = this.query
      }, 2000)
    }
    this.first = true
  }
  return (
    <div>
      <Dropdown
        placeholder='タイトルを入力してください'
        onChange={ handleChangeEvent }
        onSearchChange={ handleSearchChangeEvent }
        fluid
        search={(options, query) => {
          return options
        }}
        selection
        options={ this.state } />
    </div>)
}

export default SearchBooksForm
