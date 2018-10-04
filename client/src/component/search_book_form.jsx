import React from 'react';
import EventBus from 'eventbusjs'
import { Dropdown, Button } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';

class SearchBooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render(){
    this.execute = new Date()

    EventBus.addEventListener('update dropdown', (event, items) => {
      const archives = []
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
        archives.push(data)
      })
      this.setState({ data: archives })
    })
    const handleChangeEvent = (event, {value}) => {
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
          options={ this.state.data } />
      </div>)
  }
}

export default SearchBooksForm
