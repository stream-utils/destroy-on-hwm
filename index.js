
var destroy = require('destroy')
var assert = require('assert')

module.exports = function (stream, fn) {
  assert(stream._writableState, 'Only writable streams are supported.')
  fn = fn || destroy
  var write = stream.write
  var called = false
  stream.write = function () {
    var val = write.apply(this, arguments)
    if (val === false) maybeExecuteCallback()
    return val
  }
  function maybeExecuteCallback() {
    if (called) return
    // needs to be on two ticks as the first tick is when `.needDrain=false` is set
    process.nextTick(function () {
      process.nextTick(function () {
        if (called || !stream._writableState.needDrain) return
        called = true
        fn.call(stream, stream)
      })
    })
  }
  return stream
}
