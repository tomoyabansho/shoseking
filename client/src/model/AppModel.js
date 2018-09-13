import EventBus from 'eventbusjs'
import axios from 'axios'
import io from 'socket.io-client'

class AppModel{
  constructor(){
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
        writer: "",
        content: ""
      }
    })

    EventBus.addEventListener('change title', (event, query) => {
      console.log(query)
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
