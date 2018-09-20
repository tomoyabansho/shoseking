import React, { Component } from 'react';
import EventBus from 'eventbusjs'
import SearchBooksForm from './search_book_form'
import logo from '../image/logo.svg';
import '../style/form.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Form, Button, FormControl, FormGroup, Col, ControlLabel, HelpBlock } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
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
        <FormGroup controlId="article">
              <FormControl
              componentClass="textarea"
              placeholder="記事を入力してください"
              onChange={ e => {
                EventBus.dispatch('change content', this, e.target.value)
              } } />
        </FormGroup>
        <FieldGroup
          id="writer"
          type="text"
          label="投稿者"
          placeholder="名前を入力してください"
          onChange={ e => {
            EventBus.dispatch('change writer', this, e.target.value)
          } } />
        <FormGroup>
          <Button type='submit'>submit</Button>
        </FormGroup>
      </Form>)
  }
}
