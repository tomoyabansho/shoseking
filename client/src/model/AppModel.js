import EventBus from 'eventbusjs'
import axios from 'axios'

class AppModel{
  constructor(){
    EventBus.addEventListener('init', event => {
      this.state = {
        date: null,
        title: "",
        writer: "",
        content: ""
      }
    })

    EventBus.addEventListener('change title', (event, title) => {
      this.state.title = title
      console.log(this.state)
    })

    EventBus.addEventListener('change content', (event, content) => {
      this.state.content = content
      console.log(this.state)
    })

    EventBus.addEventListener('change writer', (event, writer) => {
      this.state.writer = writer
      console.log(this.state)
    })

    EventBus.addEventListener('submit', event => {
      this.state.date = new Date()
      axios.post('/api/archives', this.state)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(new Error(err))
        })
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
