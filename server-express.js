'use strict';
require('dotenv').config(); // will provide access for all files.

const express = require('express');
const bodyParser = require('body-parser');

const port = 9898;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello. Andrii Lundiak here!'));

app.get('/cars', (req, res) => {
    console.log(req, res);
    res.status(200).send('GET test');
});

app.post('/cars', (req, res) => {
    console.log(req, res);

    res.status(200).send('POST test');
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Cars app listening on port ${port}!`));