var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var u = req.session.user;
  if(u){
   if(u.admin){
    res.render('index', {'checkSign':2, "name" : u.name});
    }else{
      res.render('index', {'checkSign':1, "name" : u.name});
    }
  }else{
    res.render('index', {'checkSign':0, name:""});
  }
});
router.get('/game',function(req,res,next){
  res.render('game');
});

router.get('/test', function(req,res,next){
  let msg = "세션 존재 x"
  if(req.session.user){
    msg = `${req.session.user.name}님의 취미는 ${req.session.user.hobby}입니다.`;
  }
  res.send(msg);
});

module.exports = router;