import express from 'express'
import Http from 'http'
import Socketio from 'socket.io'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import Character from './character' // モデルをimport
import Archive from './archive'

const app = express()
const http = Http.Server(app)
const port = process.env.PORT || 3000
const dbUrl = 'mongodb://admin:000aaaAAA@ds149252.mlab.com:49252/shoseking'

app.use(express.static(path.join(__dirname, 'client/build')))
// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const io = Socketio.listen(http)

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')

  http.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})

io.sockets.on('connection', socket => {
  console.log('connected')

  socket.on('get archives', () => {
    Archive.find({}, (err, archiveArray) => {  // 取得したドキュメントをクライアント側と同じくcharacterArrayと命名
      if (err) console.log(err)
      else io.sockets.emit('send archives', archiveArray)  // characterArrayをレスポンスとして送り返す
    })
  })

  socket.on('post archive', archive => {
    const { date, writer, title, content, author, image_url } = archive

    new Archive({
      date,
      writer,
      title,
      content,
      author,
      image_url
    }).save(err => {
      if (err) console.error(err)
      else {
        Archive.find({}, (findErr, archiveArray) => {
          if (findErr) console.error(findErr)
          else io.sockets.emit('send archives', archiveArray)
        })
      }
    })
  })

  socket.on('delete archive', id => {
    Archive.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        Archive.find({}, (findErr, archiveArray) => {
          if (findErr) console.log(findErr)
          else io.sockets.emit('send archives', archiveArray)
        })
      }
    })
  })
})
