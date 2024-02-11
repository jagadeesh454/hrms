const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');
const MongoStore = require('connect-mongo');
require('dotenv').configDotenv({path: `./env/${process.env.NODE_ENV || 'local'}.env`});

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const api = require('./api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
      secure: false, // Change this to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000 // Set cookie expiry to 1 day (24 hours)
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // Connection URI for MongoDB
    collectionName: 'sessions', // Collection name for sessions in MongoDB
    ttl: 24 * 60 * 60 // Session expiry time in seconds (1 day)
}),
}));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
api.router(app, express);
app.use(express.static(path.join(__dirname, 'gui')));

app.get('/health', (req, res) => {
  res.send({
    message: 'Working'
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log('inside error handler', err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: err
  });
});

module.exports = app;
