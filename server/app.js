const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const app = express();

let cache = {};

app.use(morgan('dev'));

app.get('/', function(req, res) {
    if (req.query.i){
        if (cache.hasOwnProperty(req.query.i)) {
            res.send(cache[req.query.i]);
        } else {
            axios.get(`http://www.omdbapi.com/?i=${req.query.i}&apikey=8730e0e`)
            .then(function(response) {
                cache[req.query.i] = response.data;
                res.send(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    } else { 
        req.query.t = req.query.t.replace(" ", "%20");
        if (cache.hasOwnProperty(req.query.t)) {
            res.send(cache[req.query.t]);
        } else {
            axios.get(`http://www.omdbapi.com/?t=${req.query.t}&apikey=8730e0e`)
            .then((response) => {
                cache[req.query.t] = response.data;
                res.send(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
})


module.exports = app;