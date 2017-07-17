import React, {Component} from 'react'
import {observer} from 'mobx-react'

class App extends Component {
  state = {preview: null}

  render() {
    const {store} = this.props
    return <h1>eh</h1>
  }
}

export default observer(App)
