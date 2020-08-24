var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Book = require("./Book.model")
var db ='mongodb://localhost/example';

mongoose.connect(db)

var port= 9000;
var jsonParser = bodyParser.json();

app.get('/',function(req,res){
    res.send('Home Page');
});

app.get('/books',function(req,res){
    console.log('getting all books');
    Book.find({}).exec(function(err,books){
        if(err){
            res.send('Error occured!');
        }else{
            console.log(books);
            res.json(books);
        }
    });
});

app.get('/books/:id',function(req,res){
    console.log('getting one books');
    Book.find({
        _id:req.params.id
    }).exec(function(err,book){
        if(err){
            res.send('Error occured!');
        }else{
            console.log(book);
            res.json(book);
        }
    });
});

app.post('/books',jsonParser, function(req,res){
    console.log('adding book');
    Book.create(req.body,function(err,book){
        if(err){
            res.send('Error occurred!');
        }else{
            console.log(book);
            res.send(book);
        }
    });
});

app.post('/books2',jsonParser, function(req,res){
    var newBook = new Book();

    console.log(req.body);

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function(err,book){
        if(err){
            res.send('Error occurred!');
        }else{
            console.log(book);
            res.send(book);
        }
    });
});

app.put('/books/:id',jsonParser, function(req,res){
    Book.findOneAndUpdate({
        _id:req.params.id
    },
        {"title":req.body.title},function(err,book){
            console.log(book);
            res.send("updated successfully");
    });
});

app.delete('/books/:id',function(req,res){
    Book.findOneAndDelete({
        _id:req.params.id
    },function(err,book){
        console.log(book+"deleted successfully");
        res.send("deleted successfully");
    });
})

app.listen(port,function(){
    console.log("app listening on port:"+port);
});