import React from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
//

const Archive = ({ data, ...props }) => {
  const { _id, date, writer, title, content, image_url } = data
  return (
    <div>
      { date }: <br />
      { writer }: <br />
      { title }: <br />
      <ReactMarkdown source={ content } />
      <button onClick={
        e => {
          console.log(_id + ": deleted")
          const id = _id
          axios({
            method: 'delete',
            url: '/api/archives',
            data: { id }
          })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        }
      }>Delete</button>
    </div>
  )
}

export default Archive
