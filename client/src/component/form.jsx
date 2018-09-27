import React, { Component } from 'react';
import EventBus from 'eventbusjs'
import SearchBooksForm from './search_book_form'
import logo from '../image/logo.svg';
import '../style/form.css';
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <Form.Group>
      <Form.Input {...props} />
    </Form.Group>
  );
}

export default class UserForm extends Component {
  render() {

    const initForm = () => {
      const article = document.getElementById('article')
      const writer = document.getElementById('writer')
      article.value = ''
      writer.value = ''
    }

    EventBus.addEventListener('init form', () => {
      initForm()
    })

    return (
      <Form className='user_form' onSubmit={ e => {
        e.preventDefault()
        EventBus.dispatch('submit')
      } }>
        <SearchBooksForm />
        <Form.TextArea
          label='感想'
          id='article'
          placeholder='感想をどうぞ'
          onChange={ e => {
                EventBus.dispatch('change content', this, e.target.value)
          } } />
        <Form.Group>
          <FieldGroup
            id="writer"
            type="text"
            label="投稿者"
            placeholder="名前を入力してください"
              onChange={ e => {
                EventBus.dispatch('change writer', this, e.target.value)
            } } />
          <Form.Button type='submit'>submit</Form.Button>
        </Form.Group>
      </Form>)
  }
}
