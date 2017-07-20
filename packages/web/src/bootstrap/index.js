import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from '../state/Store'
import Pages from '../pages'
import AppWrap from './AppWrapGlue'
import RouteChainFactory from './RouteChainFactory'
import '../styles/index.css'

// https://github.com/foxhound87/rfx-core
const {one, two, three} = Pages

// @TODO here would be where we split pages,
//       alongside the split config in fuse or webpack
// @TODO router goes inside appwrap
const builder = new RouteChainFactory()
builder.add('/', one).add('/two', two).add('/three', three)
const Router = builder.getRouter()

const elementToRenderTo = document.getElementById('root')
const App = () => (
  <AppWrap store={store}>
    <MuiThemeProvider>
      <Router store={store} />
    </MuiThemeProvider>
  </AppWrap>
)

ReactDOM.render(<App />, elementToRenderTo)
// ReactDOM.render(<AppWrap store={store} />, elementToRenderTo)
