import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import Character from './character' // モデルをimport
import Archive from './archive'

const app = express()
const port = process.env.PORT || 3001
const dbUrl = 'mongodb://admin:aaaa0000@ds127105.mlab.com:27105/shelf'

app.use(express.static(path.join(__dirname, 'client/dist')))
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
      else response.status(200).send(archiveArray)  // characterArrayをレスポンスとして送り返す
    })
  })
/*
  // POSTリクエストに対処
  app.post('/api/characters', (request, response) => {
    const { name, age } = request.body  // 送られてきた名前と年齢を取得

    new Character({
      name,
      age,
    }).save(err => {
      if (err) response.status(500)
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })

  app.get('/api/characters', (request, response) => {
    Character.find({}, (err, characterArray) => {  // 取得したドキュメントをクライアント側と同じくcharacterArrayと命名
      if (err) response.status(500).send()
      else response.status(200).send(characterArray)  // characterArrayをレスポンスとして送り返す
    })
  })

  app.put('/api/characters', (request, response) => {
    const { id } = request.body  // updateするキャラクターのidをリクエストから取得
    Character.findByIdAndUpdate(id, { $inc: {"age": 1} }, err => {
      if (err) response.status(500).send()
      else {  // updateに成功した場合、すべてのデータをあらためてfindしてクライアントに送る
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })

  app.delete('/api/characters', (request, response) => {
    const { id } = request.body
    Character.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })
*/

  // MongoDBに接続してからサーバーを立てるために
  // app.listen()をmongoose.connect()の中に移動
  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})
