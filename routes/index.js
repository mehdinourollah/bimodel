var express = require('express');
var router = express.Router();
const request = require('request');
const axios = require('axios');

let config = require('../config')





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

router.post('/login', (req, res, next) => {
    request.get(config.host + '/issues.json?tracker_id=4&key=' + config.token + '&cf_2=' + req.body.username + '&cf_3=' + req.body.password, (err111, res111, body111) => {
        if (JSON.parse(body111).issues.length == 1)
            res.send('Logged in !!')
        else
            res.send('Not Found')
            // res.render('index', { title: 'Baas' });
    });

})

router.post('/register', (req, res, next) => {
    request.post(config.host + '/issues.json?key=' + config.token, {
        body: {
            issue: {
                project_id: 'bimodel',
                tracker_id: 4,
                subject: req.body.username,
                custom_fields: [
                    { value: req.body.username, id: 2 },
                    { value: req.body.password, id: 3 },
                ]

            }
        },
        json: true
    }, (err1, res1, body1) => {
        res.send('Registered!!!')
    })





})
module.exports = router;