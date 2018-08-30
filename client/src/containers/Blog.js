import axios from 'axios'
import React from 'react'
import { withRouteData, Link } from 'react-static'
import ArchiveList from '../components/ArchiveList'
//

class BlogPage extends React.Component{
  render(){
    return (
      <div>
        <h1>It&#39;s blog time.</h1>
        <br />
        All Posts:
        <ArchiveList />
        <Link to="/subscribe">Submit</Link>
      </div>
    )
  }
}

export default withRouteData(BlogPage)
