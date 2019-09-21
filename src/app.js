const axios = require('axios');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine(
    'handlebars',
    exphbs({
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        helpers: {
            ifEquals: (arg1, arg2, options) => {
                return arg1 === arg2 ? options.fn(this) : options.inverse(this);
            },
            apiCall: endpoint => {
                return axios
                    .get(`${process.env.API}${endpoint}`)
                    .catch(e => console.error(e));
            }
        }
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { layout: 'main', activePage: 'index' });
});

app.get('/upload', (req, res) => {
    res.render('upload', { layout: 'main', activePage: 'upload' });
});

app.get('/calendar', (req, res) => {
    res.render('calendar', { layout: 'main', activePage: 'calendar' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', { layout: 'main', activePage: 'gallery' });
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'main', activePage: 'about' });
});

const port = process.env.CLIENT_PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
