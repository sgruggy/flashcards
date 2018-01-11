const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));
app.set('view engine', 'pug');


const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// language=HTML
app.use((req, res, next) =>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    // res.status(err.status >= 100 && err.status < 600 ? err.code : 500);
    res.status(err.status);
    res.render('error');
});

app.listen(3001, () => {
    console.log("The application is running on port 3001");
});