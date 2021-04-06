if (!process.env.PORT) {
  require('dotenv').config()
  process.env.NODE_ENV = 'dev'
}

const path = require('path')
const logger = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const indexRoutes = require('./routes/index.js')
const gunsRoutes = require('./routes/guns.js')

const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/guns', gunsRoutes)
app.use('/', indexRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3000)

module.exports = app
