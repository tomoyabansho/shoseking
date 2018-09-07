import React, { Component } from 'react';
import logo from '../image/logo.svg';
import '../style/app.css';

import EventBus from 'eventbusjs'

export default class Form extends Component {
  render() {
    return (
      <form onSubmit={ e => {
        e.preventDefault()
        EventBus.dispatch('submit')
      } }>
        <label>
          タイトル:
          <input onChange={ e => {
            EventBus.dispatch('change title', this, e.target.value)
          } }/>
        </label>
        <label>
          記事:
          <input onChange={ e => {
            EventBus.dispatch('change content', this, e.target.value)
          } }/>
        </label>
        <label>
          投稿者:
          <input onChange={ e => {
            EventBus.dispatch('change writer', this, e.target.value)
          } }/>
        </label>
        <button>submit</button>
      </form>)
  }
}
