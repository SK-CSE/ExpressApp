var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  res.send('Got a POST request');
});

router.put('/', function (req, res) {
  res.send('Got a PUT request at /');
});

router.delete('/', function (req, res) {
  res.send('Got a DELETE request at /');
});

//This route path will match requests to /about.

router.get('/about', function (req, res) {
  res.send('about');
});

//This route path will match requests to /random.text.

router.get('/random.text', function (req, res) {
  res.send('random.text');
});

//Here are some examples of route paths based on string patterns.
//This route path will match acd and abcd.

router.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

//This route path will match abcd, abbcd, abbbcd, and so on.

router.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

router.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

//This route path will match /abe and /abcde.

router.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});

//Examples of route paths based on regular expressions:
//This route path will match anything with an “ab” in the route name.

router.get(/ab/, function(req, res) {
  res.send('/ab/');
});

//This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

router.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

// Here is an example of chained route handlers.
router.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

// More than one callback function can handle a route (make sure you specify the next object). For example:

router.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

// An array of callback functions can handle a route. For example:

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

router.get('/example/c', [cb0, cb1, cb2]);

// A combination of independent functions and arrays of functions can handle a route. For example:

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

router.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

module.exports = router;
