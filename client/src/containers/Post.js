import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{post.name}</h3>
    <p>{post.age}</p>
  </div>
))
