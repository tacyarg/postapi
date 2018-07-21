# PostAPI

## Postapi(name, host, token, timeout)
> Returns function: f(action, params, method, token)

```js

const Postapi = require('simplepostapi')

var Auth = Postapi('authService', 'http://auth.somesite.com')

Auth('login', {
    some: 'param'
}).then(user => {
    // do stuff
})

```