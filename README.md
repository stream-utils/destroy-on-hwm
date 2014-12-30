
# destroy-on-hwm

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Destroys a writable stream if a write ever hits the high water mark.
This is useful when piping a single stream to multiple clients -
you don't want one client slowing down the rest of the clients.
With how streams currently work, streams flow at the speed of the slowest destination stream.

## Usage

```js
var Stream = require('stream');
var destroyOnHWM = require('destroy-on-hwm');

var stream = new Stream.PassThrough();

/**
 * With no callback, attempts to execute `stream.destroy()` on high water mark.
 * This stream does not have `.destroy()` though, so it's really a noop.
 */

destroyOnHWM(stream);

/**
 * Instead, we'll just use a custom callback.
 */

destroyOnHWM(stream, function (stream) {
  assert(stream === this); // the stream is passed as both `this` and the first argument
  console.log('High water mark reached!');
});
```

[gitter-image]: https://badges.gitter.im/stream-utils/destroy-on-hwm.png
[gitter-url]: https://gitter.im/stream-utils/destroy-on-hwm
[npm-image]: https://img.shields.io/npm/v/destroy-on-hwm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/destroy-on-hwm
[github-tag]: http://img.shields.io/github/tag/stream-utils/destroy-on-hwm.svg?style=flat-square
[github-url]: https://github.com/stream-utils/destroy-on-hwm/tags
[travis-image]: https://img.shields.io/travis/stream-utils/destroy-on-hwm.svg?style=flat-square
[travis-url]: https://travis-ci.org/stream-utils/destroy-on-hwm
[coveralls-image]: https://img.shields.io/coveralls/stream-utils/destroy-on-hwm.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/stream-utils/destroy-on-hwm
[david-image]: http://img.shields.io/david/stream-utils/destroy-on-hwm.svg?style=flat-square
[david-url]: https://david-dm.org/stream-utils/destroy-on-hwm
[license-image]: http://img.shields.io/npm/l/destroy-on-hwm.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/destroy-on-hwm.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/destroy-on-hwm
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
