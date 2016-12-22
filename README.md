# babel-plugin-node-exports
Simplifies compiled CommonJS exports when working with node. 

## Installation

```sh
$ npm install babel-plugin-node-exports
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-node-exports"]
}
```

### Via CLI

```sh
$ babel --plugins node-exports script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['node-exports']
});
```

## Example

```js
import goat from 'barn';

goat();
```
to:
```js
var _barn = require('barn');

(0, _barn)();
```

(blame babel for redundant `(0, ...)`

---

If you need any other help, don't hesitate to leave an issue
