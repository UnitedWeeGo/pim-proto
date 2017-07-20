import React from 'react'
import ReactDOM from 'react-dom'
import mobx from 'mobx'
import mobxReact from 'mobx-react'
import {types} from 'mobx-state-tree'

// https://github.com/mobxjs/mobx-state-tree
const AppModel = types.model(
  {
    count: types.optional(types.number, 0),
  },
  {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  }
)

const store = AppModel.create()
export default store
