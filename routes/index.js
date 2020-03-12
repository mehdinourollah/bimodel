var express = require('express');
var router = express.Router();
const request = require('request');
const axios = require('axios');
const url = require('url');
const app = express()
const ZarinpalCheckout = require('zarinpal-checkout')
let myres = '';




/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.body)
    res.send('BAAS is Alive !!!')
        // res.render('index', { title: 'Baas' });
});
router.post('/', function(req, res, next) {
    console.log(req.body)
    res.send('BAAS is Alive !!!')
        // res.render('index', { title: 'Baas' });
});



module.exports = router;