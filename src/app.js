const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');


const app = express();


app.engine('handlebars', exphbs({
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.render()
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
