import React from 'react'
import axios from 'axios'
import { withRouteData, Link } from 'react-static'
//
export default withRouteData(() => {
  const data = {
    date: null,
    writer: -1,
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
        <label>
        タイトル:
          <input onChange={
            e => {
              data.title = e.target.value
            }
          }/>
        </label> <br />
        <label>
        感想:
          <input
            onChange={
              e => {
                data.content = e.target.value
              }
            }
          />
        </label> <br />
        <label>
        投稿者:
          <input
            onChange={
              e => {
                data.writer = e.target.value
              }
            }
          />
        </label> <br />
      </form>
      <Link to="/blog" onClick={ handleSubmit }>Post</Link>
    </div>
  )
})
