const express = require('express');
const User = require("../core/user");
const router = express.Router();

const user = new User();

//get index page

router.get('/', (req, res, next) => { 
    let user = req.session.user;
    if (user) {
        res.redirect('/home');
        return;
    }
    res.render('index', { title: "My Application" });
});

//get home page

router.get('/home', (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.render('home', { opp: req.session.opp, name: user.fullname });
        return;
    }
    else {
        res.redirect('/');
    }
});

//post login datacl

router.post('/login', (req, res, next) => {
    user.login(req.body.username, req.body.password, function (result) {
        if (result) {
            req.session.user = result;
            req.session.opp = 1;
            res.redirect('/home');

            //res.send('Logged in as :' + result.username);
        } else {
            res.send('Username/Password is incorrect!');
        }
    });
});

// post register data

router.post('/register', (req, res, next) => {

    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    user.create(userInput, function (lastId) {
        if (lastId) {

            user.find(lastId, function (result) {
                req.session.user = result;
                req.session.opp = 0;
                req.redirect('/home');
            });

            res.send('Welcome' + userInput.fullname);
        } else {
            console.log('Error: User Creation error... ');
        }
    });
});

// get loggout page

router.get('/loggout',(req,res,next)=>{
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        });
    }
});

router.post('/')

module.exports = router;
