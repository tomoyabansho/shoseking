import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

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
    console.log('receive POST request')
    console.log(request.body)  // 送られてきたデータをコンソール出力
    response.status(200).send()  // クライアントにステータスコード(200:成功)とともにレスポンスを返す
  })

  // MongoDBに接続してからサーバーを立てるために
  // app.listen()をmongoose.connect()の中に移動
  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})
