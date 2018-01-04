var express = require('express');
var router = express.Router();

router.get('/signIn', function(req,res, next){
    res.render('signIn',{chk:0});
});

router.get('/signUp',function(req,res,next){
    res.render('signUp');
});

router.get('/signOut', function(req,res,next){
    req.session.destroy();
    console.log('session destroy');
    res.redirect('/');
});

module.exports = router;