
var Stream = require('readable-stream')

var destroyOnHWM = require('..')

it('should execute the callback', function (done) {
  var stream = new Stream.Writable()
  stream._write = function () {}
  destroyOnHWM(stream, function () {
    clearInterval(id)
    done()
  })

  var id = setInterval(function () {
    stream.write(new Buffer(20000))
  }, 1)
})

it('should not execute the callback normally when write > hwm', function (done) {
  var stream = new Stream.Writable()
  stream._write = function (chunk, NULL, cb) {
    cb()
  }
  destroyOnHWM(stream, function () {
    done(new Error('NOOOOO'))
  })
  stream.on('finish', done)
  stream.on('error', done)

  var i = 0
  var id = setInterval(function () {
    i++
    stream.write(new Buffer(20000))
    if (i >= 10) {
      stream.end()
      clearInterval(id)
    }
  }, 10)
})

it('should not execute the callback normally when write < hwm', function (done) {
  var stream = new Stream.Writable()
  stream._write = function (chunk, NULL, cb) {
    cb()
  }
  destroyOnHWM(stream, function () {
    done(new Error('NOOOOO'))
  })
  stream.on('finish', done)
  stream.on('error', done)

  var i = 0
  var id = setInterval(function () {
    i++
    stream.write(new Buffer(15000))
    if (i >= 10) {
      stream.end()
      clearInterval(id)
    }
  }, 10)
})

it('should use `destroy` by default', function (done) {
  var stream = new Stream.Writable()
  stream._write = function () {}
  stream.destroy = function () {
    done()
  }
  destroyOnHWM(stream)

  var id = setInterval(function () {
    stream.write(new Buffer(20000))
  }, 1)
})
