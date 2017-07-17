// pick inferno router...
// material-ui and inferno :s ?
// import NextRouter from './NextRouter'
import {Router, Route, IndexRoute} from 'inferno-router'
import {createBrowserHistory} from 'history'
import Inferno from 'inferno'
import Component from 'inferno-component'

class NextRouter extends Component {
  constructor(...args) {
    super(...args)
  }
  shouldComponentUpdate = () => true
  render() {
    return <h1>a whole newwwww woooooorld</h1>
  }
}

const browserHistory = createBrowserHistory()
var route = (
  <Router history={browserHistory}>
    <Route path="*" component={NextRouter}/>
  </Router>
)

var rootEl = document.getElementById('react-view')
Inferno.render(route, rootEl)
