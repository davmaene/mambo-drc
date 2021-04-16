'use strict';

const express = require('express');
const app = express();
const path = require('path');
const {provinces} = require('./assets/numDRC').main;
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(formdata.array());
app.use(express.static('.'));
// engine views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/prvs', function(req, res){
    const _provinces = provinces();
    res.status(200);
    res.statusMessage = JSON.stringify({mes: _provinces});
    res.send();
})
app.post('/prv', function(req, res){
    console.log(req.body.str)
    const _provinces = provinces(req.body.str);
    if(_provinces.hasOwnProperty('Error')){
        if(_provinces.hasOwnProperty('Suggestions')){
            res.status(405);
            res.statusMessage = JSON.stringify({mes: _provinces.Suggestions});
            res.send();
        }else{
            res.status(404);
            res.statusMessage = JSON.stringify({mes: `There is no record to string ${req.body.str}`});
            res.send();
        }
    }else{
        res.status(200);
        res.statusMessage = JSON.stringify({mes: _provinces});
        res.send();
    }
    // console.log(_provinces)
})
app.get('/', function(req, res){
    res.render('home',{_pages: 'home'});
})
app.get('/province/:eq', function(req, res){
    console.log(req.params)
    res.render('province',{_pages: 'home', });
})
app.use(function(res, req, next){
    next();
})
app.listen(process.env.PORT || PORT, function(){
    console.log(`app running on http://localhost:${PORT} ver. 1.0.0`);
})