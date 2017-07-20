// import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import mobx from 'mobx'
import mobxReact from 'mobx-react'
import {types} from 'mobx-state-tree'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DevTool from 'mobx-react-devtools'

const {observer} = mobxReact

// wraps app, glues parts together...
@observer
class AppWrapGlue extends React.Component {
  // @NOTE this is a minimal example of state being updated every second
  //       which renders the wrapper and shows the count
  componentDidMount() {
    setInterval(() => {
      const {store} = this.props
      store.increment()
    }, 1000)
  }

  render() {
    const {store, children} = this.props
    const count = store.count

    return (
      <div className="playground">
        <h1>count: {count}</h1>
        {children}
      </div>
    )
  }
}

export default AppWrapGlue
