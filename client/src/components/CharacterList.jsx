import React from 'react'
import axios from 'axios'
import { requestData, receiveDataSuccess, receiveDataFailed } from '../actions'

const CharacterList = ({ store }) => {
  const { isFetching, characterArray } = store.getState().characters
  const handleFetchData = () => {
   store.dispatch(requestData())  // axios.get()を呼ぶ前にisFetchingをtrueにしておく
   axios.get('/api/characters')
    .then(response => {  // データ受け取りに成功した場合
        const _characterArray = response.data
        store.dispatch(receiveDataSuccess(_characterArray))    // データをstoreに保存するとともにisFetchingをfalseに
     })
     .catch(err => {  // データ受け取りに失敗した場合
       console.error(new Error(err))
       store.dispatch(receiveDataFailed())  // isFetchingをfalseに
     })
  }
  return (
    <div>
    {
        isFetching  // isFetchingの値で分岐
          ? <h2>Now Loading...</h2>  // データをFetch中ならばローディングアイコンを表示
          : <div>
              <button onClick={() => handleFetchData()}>fetch data</button>
              <ul>
                {characterArray.map(character => (
                  <li key={character._id}>
                    {`${character.name} (${character.age})`}
                  </li>
                ))}
              </ul>
            </div>
      }
    </div>
  )
}

export default CharacterList
