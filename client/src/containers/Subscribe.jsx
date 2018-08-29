import React from 'react'
import axios from 'axios'
import { withRouteData, Link } from 'react-static'
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap'
//
import 'bootstrap/dist/css/bootstrap.min.css'

const FieldGroup = ({ id, label, help, ...props }) => (
  <FormGroup controlId={ id }>
    <ControlLabel>{ label }</ControlLabel>
    <FormControl { ...props } />
      {
        help && <HelpBlock>{ help }</HelpBlock>
      }
  </FormGroup>
)

export default withRouteData(() => {
  const data = {
    date: null,
    writer: "",
    title: "",
    content: "",
    image_url: ""
  }

  const handleSubmit = e => {
    data.date = new Date()

    axios.post('/api/archives', data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return  (
    <div>
      <form>
        <FieldGroup
          id="title"
          label="タイトル:"
          onChange={
            e => {
              data.title = e.target.value
            }
          }
        />
        <FormGroup controlId="content">
          <ControlLabel>Content</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="感想をどうぞ"
            onChange={
              e => {
                data.content = e.target.value
              }
            } />
        </FormGroup>
        <FieldGroup
          id="writer"
          label="投稿者:"
          onChange={
            e => {
              data.writer = e.target.value
            }
          }
        />
      </form>
      <Link to="/blog" onClick={ handleSubmit }>Post</Link>
    </div>
  )
})
