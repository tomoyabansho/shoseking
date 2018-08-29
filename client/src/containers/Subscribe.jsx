import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(() => {
  const data = {
    name: "",
    age: -1
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(data)
  }

  return  (
    <div>
      <form onSubmit={
        e => handleSubmit(e)
      }>
        <label>
        名前:
          <input onChange={
            e => {
              console.log(e.target.value)
              data.name = e.target.value
            }
          }/>
        </label> <br />
        <label>
        年齢:
          <input onChange={
            e => {
              console.log(e.target.value)
              data.age = e.target.value
            }
          }/>
        </label> <br />
        <button type="submit">submit</button>
      </form>
    </div>
  )
})
