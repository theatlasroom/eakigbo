require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const compression = require('compression')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');

const routes = require('./routes/index');

const app = express();

// Pretty output html
app.locals.pretty = true;

const STATIC_FILES = '/static'

if (process.env.NODE_ENV === 'development'){
  // Bundle static assets to serve
  const files = [
    path.join(__dirname, 'src/main.js'),
    path.join(__dirname, 'src/styles.css'),
    path.join(__dirname, 'src/*.{png|jpg}'),
  ];

  // See options section of api docs, for the possibilities
  const options = {
    outDir: path.join(__dirname, './public/dist'),
    cache: true,
    contentHash: true,
    minify: true,
    hmr: false,
    publicUrl: `${STATIC_FILES}/dist`
  };

  // Initialize a new bundler using a files and options
  const bundler = new Bundler(files, options);

  // Let express use the bundler middleware, this will let Parcel handle every request over your express server
  app.use(bundler.middleware());
}

// set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);


// set the cache for static files
app.use(compression());
const longCache = 86400000 * 30; // cache for 30 days (in ms)
app.use(STATIC_FILES, express.static(path.join(__dirname, 'public'), { maxAge: longCache }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started !`)
})
