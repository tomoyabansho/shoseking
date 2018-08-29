import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouteData, Link } from 'react-static'
//

class BlogPage extends React.Component{

  constructor(props){
    super(props)
    const parent = this
    axios.get('/api/characters')
    .then(response => {
      response.data.map(user => {
        parent.updateList(user)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  updateList(data){
    const temp = document.createElement("p")
    ReactDOM.render(
      <li>{ data.name }: { data.age }</li>,
      temp
    )
    document.getElementById('archives').appendChild(temp)
  }

  render(){
    return (
      <div>
        <h1>It&#39;s blog time.</h1>
        <br />
        All Posts:
        <ul id="archives">
        </ul>
        <Link to="/subscribe">Submit</Link>
      </div>
    )
  }
}

export default withRouteData(BlogPage)
