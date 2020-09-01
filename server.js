const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express();
mongoose.connect('mongodb://127.0.0.1/blog' ,  { useNewUrlParser: true , useUnifiedTopology: true })
const articleRouter = require('./routes/articles')
app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))
app.use('/fileuploads', express.static(process.cwd() + '/fileuploads'));

app.get('/' , (req , res , next)=>{
    const articles = Article.find().sort({createdAt : 'desc'}).then((articles) =>{
        res.render('articles/index' , {articles: articles})
    })
    

})

app.use('/articles' , articleRouter)
app.listen(3000 , ()=>{
    console.log('Runing on port 3000')
});
