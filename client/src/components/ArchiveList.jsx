import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import Archive from './Archive'
//

class ArchiveList extends React.Component {
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

  updateList(data){
    const temp = document.createElement("p")
    ReactDOM.render(
      <li><Archive data={ data }/></li>,
      temp
    )
    this.archives.appendChild(temp)
  }

  componentDidMount(){
    this.archives = document.getElementById('archives')
  }

  render(){
    return (
      <ul id="archives">
      </ul>
    )
  }
}

export default ArchiveList
