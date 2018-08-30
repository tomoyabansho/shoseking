import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouteData, Link } from 'react-static'
import Archive from '../components/Archive'
//

class BlogPage extends React.Component{

  constructor(props){
    super(props)
    const parent = this

    axios.get('/api/archives')
    .then(response => {
      response.data.map(archive => {
        parent.updateList(archive)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.archives = document.getElementById('archives')
  }

  updateList(data){
    const temp = document.createElement("p")
    ReactDOM.render(
      <li><Archive data={ data }/></li>,
      temp
    )
    this.archives.appendChild(temp)
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
