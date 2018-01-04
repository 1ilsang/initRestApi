var express = require('express');
var router = express.Router();
var db = require('../database/database');

router.get('/', function(req, res, next) {
    if(!req.session.user.admin){
        res.redirect('/');
    }

    var sql = 'SELECT * FROM user';

    db.query(sql,[],function(err,result){
        if(err)console.log(err);
        res.render('adminUserList', {rows : result});
    });
});

router.get('/edit',function(req,res,next){
    var u = req.session.user;
    if(!u.admin){
        res.redirect('/');
    }
    res.render('adminEdit', {session : u});
});

module.exports = router;