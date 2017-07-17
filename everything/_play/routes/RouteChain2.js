// import {BrowserRouter, Match, matchPattern, Redirect} from 'react-router-dom'
// import {BrowserRouter as Router} from 'react-router-dom'
// import {createBrowserHistory} from 'history'

// const browserHistory = createBrowserHistory()
// const _Chain = Chain
// debugger
// console.log(_Chain)

import routeToRegExp from 'path-to-regexp'

class RouteChain {
  // events, presets (redirect)
  // return (<Redirect to={{pathname: route.onEnter(), state: {from: pathname}}}/>)
  // fat arrow means bound to `this`
  find = path => {
    throw new Error()
    this.log('finding', path)

    // eslint-disable-next-line
    debugger
    for (let route of this.routes.values()) {
      if (route.test(path)) {
        // eslint-disable-next-line
        debugger
      }
    }

    return <h1>no routes round {path}</h1>
  }

  log = (msg, data) => {
    console.log(msg, data)
  }

  // @alias build
  getRouter() {
    this.log('get router')
    const findComponent = () => {
      console.log('find')

      this.find()
    }

    return (stateStore) => {
      this.log('rendering router')
      this.state = stateStore

      return (
        <BrowserRouter>
          <Match pattern={'*'} component={findComponent} />
        </BrowserRouter>
      )
    }
  }
}
