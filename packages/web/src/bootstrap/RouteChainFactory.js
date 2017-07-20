import React from 'react'
import {Chain, ChainedSet} from 'chain-able/dist'
import routeToRegExp from 'path-to-regexp'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

const browserHistory = createHistory()
const listLinkAndRoute = (path, component) => {
  return {
    li: <li><Link to={path}>{path}</Link></li>,
    route: <Route path={path} component={component}/>,
  }
}

/**
 */
class RouteChain extends Chain {
  constructor(parent) {
    super(parent)
    this.history = browserHistory
    this.routes = new ChainedSet()
    this.state = {}
  }

  add(pathToMatch, component) {
    const test = routeToRegExp(pathToMatch)

    this.routes.add({
      pathToMatch,
      test,
      component,
    })

    return this
  }

  // @TODO generate these, this is just hardcoded for quickest list
  getRouter() {
    const [One, Two, Three] = this.routes.values().map(route => route.component)


    return () => (
      <Router>
        <div>
          <ul>
            <li><Link to="/">One</Link></li>
            <li><Link to="/two">Two</Link></li>
            <li><Link to="/three">Three</Link></li>
          </ul>
          <Route exact path="/" component={One}/>
          <Route path="/two" component={Two}/>
          <Route path="/three" component={Three}/>
        </div>
      </Router>
    )
  }
}

export default RouteChain
