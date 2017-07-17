// https://gist.github.com/jlong/2428561
//
// @TODO: make open source lib
// make modular for importing utils
const qs = require('querystring')

const {stringify} = qs

function query() {}

// take the ? & # out of the keys
// : {}
query.clean = function(parsed) {
  var keys = Object.keys(parsed)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = parsed[key]
    key = key.replace('#', '').replace('?', '')
    parsed[key] = val
  }
  return parsed
}

// @TODO: use
query.hasInWindow = function(property: string, type = 'hash'): boolean {
  const parsedSearch = query.clean(qs.parse(window.location.search))
  const parsedHash = query.clean(qs.parse(window.location.hash))

  if (parsedSearch[property]) return true
  if (parsedHash[property]) return true
  return false
}
query.getFromWindow = function(property: string, type = 'hash'): string | null {
  const parsedSearch = query.clean(qs.parse(window.location.search))
  const parsedHash = query.clean(qs.parse(window.location.hash))

  if (parsedSearch[property]) return parsedSearch[property]
  if (parsedHash[property]) return parsedHash[property]
  return null
}
query.get = function(property: string, type = 'hash'): string | null {
  const parsedSearch = query.clean(qs.parse(this.search))
  const parsedHash = query.clean(qs.parse(this.hash))
  if (parsedSearch[property]) return parsedSearch[property]
  if (parsedHash[property]) return parsedHash[property]
  return null
}

query.includes = function(needle) {
  var regex = new RegExp('\/(' + needle + ')([\?|\/].*)?$')
  const pathMatch = window.location.href.match(regex)
  return pathMatch && pathMatch[1] == needle
}

type ParsedUrlType = {
  protocol: ?string,
  hostname: ?string,
  port: ?number,
  pathname: ?string,
  search: ?mixed,
  hash: ?string,
  host: ?string,

  get: ?() => mixed,
  isRoot: ?boolean,
  // parsedHash: ?{},
  // parsedSearch: ?{},
}

// @TODO:
// - [ ] flowtype
// - [ ] add safety so it can be used the same without ability to createElement
// - [ ] make it a mini lib
// - [ ] look at other matchers for route things
//
// 'http://example.com:3000/pathname/?search=test#hash'
// parser.protocol // => "http:"
// parser.hostname // => "example.com"
// parser.port     // => "3000"
// parser.pathname // => "/pathname/"
// parser.search   // => "?search=test"
// parser.hash     // => "#hash"
// parser.host     // => "example.com:3000"
function parseUrl(href: string): ParsedUrlType {
  if (!href) href = window.location.href
  var parser = document.createElement('a')
  parser.href = href

  // var parsedHash = query.clean(qs.parse(window.location.hash))
  // var parsedSearch = query.clean(qs.parse(window.location.search))

  var parsed = {
    protocol: parser.protocol,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash,
    host: parser.host,
  }

  // ease of access
  var {pathname, search, hash} = parsed

  var parsedHash = query.clean(qs.parse(hash))
  var parsedSearch = query.clean(qs.parse(search))

  query.get = query.get.bind(parsed)
  var get = query.get.bind(parsed)
  var includes = query.includes

  // if these are all empty
  var isRoot = ['', '/'].includes(pathname) && search === '' && hash === ''
  if (!isRoot)
    isRoot =
      parser.origin + '/' === window.location.href ||
      parser.origin === window.location.href

  var easy = Object.assign(parsed, {
    get,
    isRoot,
    includes,
    parsedHash,
    parsedSearch,
  })

  // console.debug('parseurl', {easy})

  return easy
}

parseUrl.query = query
parseUrl.parseAndFilter = (pathname: string, filtered): Array => {
  const results = []

  // remove leading & trailing slashes
  pathname = pathname.replace(/^\/|\/$/g, '')
  var split = pathname.split('/')

  split.forEach(name => {
    if (name != filtered)
      results.push([
        name,
        {
          key: name,
          pathname,
        },
      ])
  })

  return results
}

parseUrl.appendParamsString = (url, param) => {
  if (!url || !param) return url
  url = url.concat('?', stringify(param, '&', '=', false))
  return url
}

module.exports = parseUrl
