const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const saltRounds = 10;
const userController = {
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
      req.flash('errorMessage', '欄位填寫不完整')
      return next()
    }
    User.findOne({
      where: {
        name: username
       } 
    }).then(user => {
      bcrypt.compare(password, user.password, function(err, result) {
        if (err || !result) {
          req.flash('errorMessage', '帳號或密碼不正確')
          return next()
        }
        req.session.username = username
        res.redirect('/')
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleLogout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}
module.exports = userController