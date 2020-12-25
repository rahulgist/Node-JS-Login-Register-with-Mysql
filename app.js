const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');

const app = express();

// for body parser
app.use(express.urlencoded({extended : false}));

// server static file
app.use(express.static(path.join(__dirname,'public')));

// template engine

app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

//session

app.use(session({
    secret:'Tutube video',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60 * 1000 * 30
    }
}));

app.use('/',pageRouter);

//error handle :Page not found
app.use((req,res,next)=>{
    var err = new Error('Page not found!');
    err.status = 404;
    next(err);
});

//Handling errors

app.use((req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});


//setting up the server

app.listen(4000,()=>{
    console.log("Server is running at port 4000");
});

module.exports =app;