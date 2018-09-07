import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import Character from './character' // モデルをimport
import Archive from './archive'

const app = express()
const port = process.env.PORT || 3001
const dbUrl = 'mongodb://admin:000aaaAAA@ds149252.mlab.com:49252/shoseking'

app.use(express.static(path.join(__dirname, 'client/build')))
// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')

  app.post('/api/archives', (request, response) => {
    const { date, writer, title, content, image_url } = request.body

    new Archive({
      date,
      writer,
      title,
      content,
      image_url
    }).save(err => {
      if (err) response.status(500)
      else {
        Archive.find({}, (findErr, archiveArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send()
        })
      }
    })
  })

  app.get('/api/archives', (request, response) => {
    Archive.find({}, (err, archiveArray) => {  // 取得したドキュメントをクライアント側と同じくcharacterArrayと命名
      if (err) response.status(500).send()
      console.log(archiveArray)
      else response.status(200).send(archiveArray)  // characterArrayをレスポンスとして送り返す
    })
  })

  app.delete('/api/archives', (request, response) => {
    const { id } = request.body
    Archive.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        Archive.find({}, (findErr, archiveArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(archiveArray)
        })
      }
    })
  })

  // MongoDBに接続してからサーバーを立てるために
  // app.listen()をmongoose.connect()の中に移動
  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})
