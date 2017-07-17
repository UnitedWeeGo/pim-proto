const parseUrl = require('./deps/parse-url')
const globToRegex = require('./deps/glob-to-regex')
const {Chain} = require('chain-able')

function unify(string) {
  return string.replace(/[.?#!&]/g, '').toLowerCase()
}

/**
 * @TODO
 *  connect to localstorage
 *  for localstorage routing
 *  -> on change, set localstorage
 *
 * @TODO
 *  for webworker
 *  .toJSON
 *  .parseJSON
 *
 * @TODO
 *  from obj -> extract urls from an object
 *
 * @TODO
 *   could also use addQueries
 *   addQuery(name, value)
 *   setQuery(name, value)
 *
 * @TODO
 *  build() -> prevents it from setting every time
 *
 * @TODO
 *  promise chains with Fluture or sindresorhus's promise micro libs and flow
 *
 * @TODO add route matching globs to allow mapping any old routes to new route,
 *       or routes matching unknown routes to specific fallback routes
 *
 * @TODO can simplify it with `dot(true)` mode
 * @TODO https://github.com/medialize/URI.js
 *
 * @example .when(router.isRoot(), () => {})
 * @type {Chain}
 */
class RouteChain extends Chain {
  constructor(parent) {
    super(parent)

    // replace
    // reload
    const data = window.location

    // https://developer.mozilla.org/en-US/docs/Web/API/History_API
    /* prettier-ignore */
    this
      .set('location', data)
      .set('location.hash', data.hash)
      .set('location.href', data.href)
      .set('location.search', data.search)
      .set('location.host', data.host)
      .set('location.hostname', data.hostname)
      .set('location.origin', data.origin)
      .set('location.pathname', data.pathname)
      .set('rel', data.href.split(data.origin).pop())

    /* prettier-ignore */
    this.parse()
  }

  /**
   * @tutorial https://www.npmjs.com/package/history
   * @see    this.push, this.subscribe, this.default
   * @param  {History} [history=null] history object to subscribe & push to
   * @return {RouteChain} @chainable
   */
  history(history = null) {
    return this.set('history', history)
  }

  /**
   * @TODO any other defaults in here,
   *       if there is no history this fn is not helpful
   *
   * @desc setup default with history
   * @param  {History} [history=true] true to create, object for existing history
   * @return {RouteChain} @chainable
   */
  default(history = true) {
    const onChange = (location, action) => {
      console.log(`${location.pathname}${location.search}${location.hash}`)
      console.log(`The last navigation action was ${action}`)
    }

    let historyObj = history
    if (historyObj === true) {
      const {createBrowserHistory} = require('history')
      historyObj = createBrowserHistory()
    }

    /* prettier-ignore */
    return this
      .history(historyObj)
      .subscribe(onChange)
      .subscribe(this.handleUpdate.bind(this))
      .registerHistorySubscribers()
  }

  /**
   * @desc is the highest route
   * @example htts://app.thegrid.io
   * @example NOT https://app.thegrid.io/eh
   * @return {Boolean}
   */
  isRoot() {
    return this.get('parsed').isRoot()
  }

  /**
   * @TODO compat for local by scoping variable...
   * @desc parses window route (when window is avail)
   * @return {RouteChain} @chainable
   */
  parse() {
    const parsed = parseUrl()
    const {parsedSearch, parsedHash} = parsed

    let queries = Object.assign(parsedSearch, parsedHash)
    Object.keys(queries).forEach(param => {
      queries[unify(param)] = queries[param]
    })

    /* prettier-ignore */
    return this
      .set('parsed', parsed)
      .set('search', parsedSearch)
      .set('hash', parsedHash)
      .set('queries', queries)
  }

  /**
   * @param  {string} path subpath to push to html5 history
   * @return {RouteChain} @chainable
   */
  push(path: string) {
    this.get('history').push(path)
    return this
  }

  /**
   * @NOTE wip
   * @param  {Array<string>} queries
   * @return {RouteChain} @chainable
   */
  remapQueries(queries) {
    let rel = this.get('rel')

    queries.forEach(query => {
      const {from, to} = query
      rel = rel.replace(from, to)
    })

    console.log({rel})
    return this
  }

  /**
   * @desc transform old routes to new routes
   * @param  {Array<Object>} routes {from, to}
   * @return {RouteChain} @chainable
   */
  fromto(routes) {
    const transformers = []

    routes.forEach(route => {
      const {to, from} = route
      let matcher

      if (from.includes('*')) {
        matcher = () => globToRegex(from).test(this.get('location.href'))
      } else {
        matcher = () => this.get('location.href') === from
      }

      const transformer = () => {
        if (matcher()) {
          this.push(to)
        }
      }

      transformers.push(transformer)
    })

    // @TODO merge
    return this.set('transformers', transformers)
  }

  /**
   * @desc set getters as shorthand
   * @example ['siteID'] -> routeChain.siteID()
   * @param {Array} [methods=[]]
   * @return {RouteChain} @chainable
   */
  addCommonQueries(methods = []) {
    methods.forEach(method => {
      this[method] = () => this.find(method)
    })
    return this
  }

  /**
   * @desc get param
   * @param  {string} param name of param
   * @return {string | undefined} data from a route
   */
  find(param: string): string | mixed {
    return this.get('queries')[unify(param)]
  }

  // --- changing ---

  /**
   * @event history.onChange
   * @desc subscribe to route changes
   *       adds cb to array of subscribers
   *       @mutates store.subscribers
   *
   * @see this.registerHistorySubscribers
   * @param  {Function} [cb=Function.prototype]
   * @return {RouteChain} @chainable
   */
  subscribe(cb = Function.prototype) {
    const subscribers = (this.get('subscribers') || []).concat([cb])
    return this.set('subscribers', subscribers)
  }

  /**
   * @protected
   * @desc when subscribers are registered, pass them the data from history
   * @see this.subscribe
   * @return {RouteChain} @chainable
   */
  registerHistorySubscribers() {
    if (this.has('registered') === true) return this
    this.set('registered', true)

    const subscribers = this.get('subscribers')
    this.get('history').listen((location, action) => {
      for (let i = 0; i < subscribers.length; i++) {
        subscribers[i](location, action)
      }
    })

    return this
  }

  /**
   * @protected
   * @event history.onChange
   * @see this.subscribers
   * @param {Object} location
   * @param {Object} action
   * @return {RouteChain} @chainable
   */
  handleUpdate() {
    this.parse()
    return this
  }

  /**
   * @example http://canada.ca/app/moose/eh is `eh`
   * @return {string | null}
   */
  currentKey() {
    let currentKey = this.get('pathname')

    // transform it
    if (currentKey && currentKey.includes('/')) {
      currentKey = currentKey.split('/')
    }
    if (currentKey && currentKey.length > 1) currentKey = currentKey.pop()
    if (currentKey) currentKey = currentKey.split('?').shift()

    return currentKey
  }
}

RouteChain.RouteChain = RouteChain
module.exports = RouteChain
