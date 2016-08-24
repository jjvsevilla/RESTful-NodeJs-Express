var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//mongodb://localhost/database
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
bookRouter = require('./Routes/bookRoutes')(Book);

/*
var bookRouter = express.Router();
bookRouter.route('/Books')
  .post(function(req, res){
    var book = new Book(req.body);
    //check data
    // console.log(book);
    // res.send(book);

    book.save();
    res.status(201).send(book);
  })
  .get(function(req,res){
    var query = {};
    if(req.query.genre)
    {
      query.genre = req.query.genre;
    }
    Book.find(query, function(err,books){
      if(err)
        res.status(500).send(err);
      else
        res.json(books);
    });
  });

bookRouter.route('/Books/:bookId')
  .get(function(req,res){
    Book.findById(req.params.bookId, function(err,book){
      if(err)
        res.status(500).send(err);
      else
        res.json(book);
    });
  });
*/

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
  res.send('welcome to my API!');
});

app.listen(port, function(){
  console.log('Gulp is running my app on  PORT: ' + port);
});
