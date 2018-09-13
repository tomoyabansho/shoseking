import EventBus from 'eventbusjs'
import axios from 'axios'
import io from 'socket.io-client'

class AppModel{
  constructor(){

    this.items = []

    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log('connected')
      socket.emit('get archives')
    })

    socket.on('send archives', data => {
      EventBus.dispatch('finish load', this, data)
    })

    this.list = {
      isFetching: false,
      archiveArray: []
    }

    EventBus.addEventListener('init', event => {
      this.state = {
        date: null,
        title: "",
        author: '',
        image_url: '',
        writer: "",
        content: ""
      }
    })

    EventBus.addEventListener('change title', (event, query) => {
      this.now = new Date()
      if(!this.execute || this.now - this.execute > 1000){
        const url = `https://www.googleapis.com/books/v1/volumes?q=${ query }`
        const array = []
        axios.get(url)
          .then(response => {
            const items = response.data.items
            items.map(({id, volumeInfo}) => {
              const thumbnail = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
                ? volumeInfo.imageLinks.thumbnail
                : "https://picsum.photos/300/450"
              const item = {
                key: id,
                title: volumeInfo.title,
                author: volumeInfo.authors,
                thumbnail: thumbnail
              }
              array.push(item)
            })
            this.items = array
            EventBus.dispatch('update dropdown', this, this.items)
          })
          .catch(error => {
            console.error(error)
          })
        this.execute = this.now
        }
    })

    EventBus.addEventListener('select book', (event, value) => {
      this.state.title = value
    })

    EventBus.addEventListener('change content', (event, content) => {
      this.state.content = content
    })

    EventBus.addEventListener('change writer', (event, writer) => {
      this.state.writer = writer
    })

    EventBus.addEventListener('submit', event => {
      this.state.date = new Date()
      socket.emit('post archive', this.state)
      EventBus.dispatch('init form')
    })

    EventBus.addEventListener('delete', (event, id) => {
      socket.emit('delete archive', id)
    })
  }
}

AppModel.generate = () => {
  if(AppModel._instance === undefined){
    AppModel._instance = new AppModel()
  }
  return AppModel._instance
}

export default AppModel
