const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    const name = request.cookies.username;
    if (!name){
        response.redirect('/hello');
    }

    else{
        response.render('index', {name});
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;    
    if (!name){
        res.render('hello');
    }

    else{
        res.redirect('/');            
    }
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router;