import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Character from './character' // モデルをimport

const app = express()
const port = 3001
const dbUrl = 'mongodb://localhost/crud'

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected')

  // POSTリクエストに対処
  app.post('/api/characters', (request, response) => {
    const { name, age } = request.body  // 送られてきた名前と年齢を取得

    new Character({
      name,
      age,
    }).save(err => {
      if (err) response.status(500)
      else response.status(200).send(`${name}(${age}) was successfully created.`)
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


  // MongoDBに接続してからサーバーを立てるために
  // app.listen()をmongoose.connect()の中に移動
  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})
