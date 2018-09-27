import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//  スキーマの作成
//  今回保存したいドキュメントはname(String)とage(Number)の２つのフィールドを持つ
const ArchiveSchema = new mongoose.Schema({
  date: Date,
  writer: String,
  title: String,
  content: String,
  author: String,
  image_url: String
})

// モデルの作成
// mongoose.modelの第一引数の複数形の名前（今回だと'characters'）のコレクションが生成される
const Archive = mongoose.model('Archive', ArchiveSchema)

// モデルをexport
export default Archive
