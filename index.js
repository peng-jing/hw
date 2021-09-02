const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash');
const port = 5001

const articleController = require('./controllers/article')
const userController = require('./controllers/user')

app.set('view engine', 'EJS')
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 在 http 環境也能記錄
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function checkPermission(req, res, next) {
  const {username} = req.session
  if (!username) {
    req.flash('errorMessage', '你沒有權限')
    res.redirect('back')
    next()
  }
}
function redirtctBack(req, res, next) {
  res.redirect('back')
  next()
}

app.get('/', articleController.getlimit5, redirtctBack)
app.get('/article/:id', articleController.get, redirtctBack)
app.get('/all', articleController.getAll, redirtctBack)
app.get('/manage', articleController.manage, checkPermission)
app.get('/create', articleController.create, checkPermission)
app.post('/create', articleController.handleCreate, redirtctBack)
app.get('/update/:id', articleController.update, checkPermission)
app.post('/update/:id', articleController.handleUpdate, redirtctBack)
app.post('/delete/:id', articleController.handleDelete, redirtctBack)

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirtctBack)
app.get('/logout', userController.handleLogout, redirtctBack)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})