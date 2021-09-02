const db = require('../models')
const Article = db.article

const articleController = {
  getlimit5: (req, res, next) => {
    Article.findAll({
      limit: 5,
      order: [
        ['id', 'DESC']
      ]
    }).then(articles => {
      res.render('index', {
        articles
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  get: (req, res) => {
    const id = req.params.id
    Article.findOne({
      where: {
        id
      }
    }).then(article => {
      res.render('article', {
        article
      })
    }).cathc(err => {
      req.flash('errorMessage', err.toSting())
      return next()
    })
  },
  getAll: (req, res, next) => {
    Article.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(articles => {
      res.render('all',{
        articles
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      next()
    })
  },
  manage: (req, res, checkPermission) => {
    checkPermission()
    Article.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then(articles => {
      res.render('manage', {
        articles
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return res.redirect('back')
    })
  },
  create: (req, res, checkPermission) => {
    checkPermission()
    res.render('create')
  },
  handleCreate: (req, res, next) => {
    const {title, content} = req.body
    Article.create({
      title,
      content 
    }).then(() => {
      res.redirect('/manage')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update: (req, res,  checkPermission) => {
    checkPermission()
    const id = req.params.id
    Article.findOne({
      where: {
        id
      }
    }).then(article => {
      res.render('update', {
        article
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      res.redirect('back')
    })
  },
  handleUpdate: (req, res) => {
    const {id} = req.params
    const {title, content} = req.body
    if (!title || !content) {
      req.flash('errorMessage', '')
    }
    Article.update({
      title,
      content
    },{
      where: {
        id
      }
    })
  },
  handleDelete: (req, res) => {

  }
}
module.exports = articleController

