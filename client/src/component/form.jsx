import React, { Component } from 'react';
import logo from '../image/logo.svg';
import '../style/app.css';

export default class Form extends Component {
  render() {
    return (
      <form>
        <label>
          タイトル:
          <input />
        </label>
        <label>
          記事:
          <input/>
        </label>
        <label>
          投稿者:
          <input/>
        </label>
        <button>submit</button>
      </form>)
  }
}
