import React, { Component } from 'react';
import EventBus from 'eventbusjs'
import logo from '../image/logo.svg';
import '../style/form.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Form, Button, FormControl, FormGroup, Col, ControlLabel, HelpBlock } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class UserForm extends Component {
  render() {

    const initForm = () => {
      const title = document.getElementById('title')
      const article = document.getElementById('article')
      const writer = document.getElementById('writer')
      title.value = ''
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
        <FieldGroup
          id="title"
          type="text"
          label="タイトル"
          placeholder="タイトルを入力してください"
          onChange={ e => {
            EventBus.dispatch('change title', this, e.target.value)
          } } />
        <FormGroup controlId="article">
              <ControlLabel>記事</ControlLabel>
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
          placeholder="記事を入力してください"
          onChange={ e => {
            EventBus.dispatch('change writer', this, e.target.value)
          } } />
        <FormGroup>
          <Button type='submit'>submit</Button>
        </FormGroup>
      </Form>)
  }
}
