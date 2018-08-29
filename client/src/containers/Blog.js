import axios from 'axios'

import React from 'react'
import ReactDOM from 'react-dom'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(() => {

  const updateList = (data) => {
    const temp = document.createElement("p")
    ReactDOM.render(
      <li>{ data.name }: { data.age }</li>,
      temp
    )
    document.getElementById('archives').appendChild(temp)
  }

  axios.get('/api/characters')
  .then(response => {
    console.log(response.data)
    response.data.map(character => {
      updateList(character)
    })
  })
  .catch(error => {
    console.log(error)
  })

  return (
    <div>
      <h1>It&#39;s blog time.</h1>
      <br />
      All Posts:
      <ul id="archives">
      </ul>
    </div>
  )
})
