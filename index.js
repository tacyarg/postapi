var join = require('url-join')
var request = require('request-promise')
var assert = require('assert')

module.exports = function (name, host, token, timeout) {
  assert(host, 'Api requires host address')
  timeout = timeout || 5 * 1000 * 60

  function call (action, params, method, liveToken) {
    var options = {}
    options.uri = join(host, action)
    options.body = params || {}
    options.json = true
    options.method = 'POST'
    if (timeout) options.timeout = timeout

    var t = token || liveToken

    if (t) {
      options.headers = {}
      options.headers['Authorization'] = 'Bearer ' + t
    }
    options.resolveWithFullResponse = true
    options.simple = false
    return request(options)
  }

  return function (action, params, method, token) {
    return call(action, params, method, token).then(function (result) {
      return result
    }).catch(function (err) {
      console.error(err.message)
      throw new Error('Cannot reach ' + name + ', make sure its online')
    }).then(function (result) {
      assert(/^2/.test('' + result.statusCode), result.body)
      return result.body
    })
  }
}
