import React from 'react'
import axios from 'axios'
import { withRouteData, Link } from 'react-static'
//
export default withRouteData(() => {
  const data = {
    name: "",
    age: -1
  }

  const handleSubmit = e => {
    axios.post('/api/characters', data)
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
        名前:
          <input onChange={
            e => {
              data.name = e.target.value
            }
          }/>
        </label> <br />
        <label>
        年齢:
          <input
            onChange={
              e => {
                data.age = e.target.value
              }
            }
          />
        </label> <br />
      </form>
      <Link to="/blog" onClick={ handleSubmit }>Post</Link>
    </div>
  )
})
