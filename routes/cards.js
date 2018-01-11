const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/:id', (req, res) => {
    const {side} = req.query;
    var {id} = req.params;
    const numCards = cards.length;    

    if(parseInt(id) >= cards.length){
        return res.redirect('/cards/0?side=question');
    }
    
    if(!side || (side != 'question' && side != 'answer')){
        return res.redirect('/cards/' + id + '?side=question');
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];
    var nextId = parseInt(id) + 1;
    if (nextId >= numCards){
        nextId = 0;
    }

    const templateData = {text, hint, side, id, nextId, name};

    res.render('card', templateData);
});

router.get('/', (req, res) => {
    res.redirect('/cards/0?side=question');
});

module.exports = router;