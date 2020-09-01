const express = require('express');
const Article = require('./../models/article')
const router = express.Router();
router.get('/new', (req, res, next) => {
    res.render('articles/new', { article: new Article() })
})
router.get('/:id', (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            res.render('articles/show', { article: article })
        }).catch((err) => {
            var error = new Error;
            error.status = 404;
            error.message = ("An error occured, please try again")
            res.send(error)
        });
})
router.get('/edit/:id' , (req , res)=>{
    Article.findById(req.params.id)
        .then((article) => {
            res.render('articles/edit', { article: article })
        }).catch((err) => {
            var error = new Error;
            error.status = 404;
            error.message = ("An error occured, please try again")
            res.send(error)
        });

})
router.post('/', (req, res) => {
    let article = Article.create({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    }).then((article) => {
        res.redirect(`/articles/${article.id}`)
    })
        .catch((err) => {
            var error = new Error;
            error.status = 404;
            error.message = ("An error occured, please try again")
            res.send(error)
        });
});
router.delete('/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then((v) => {
            res.redirect('/')
        })
        .catch(err => {
            var error = new Error;
            error.status = 404;
            error.message = ("An error occured, please try again")
            res.send(error)
        })
})
router.put('/:id' , (req , res)=>{
    
})
module.exports = router;