var express = require('express');
var router = express.Router();
var db = require('../database/database');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dropOut',function(req,res,next){

});


router.post('/addUser',function(req,res,next){
  var id = req.body.id;
  var pwd = req.body.pwd;
  var name = req.body.name;
  var hobby = req.body.hobby;
  var content = req.body.content;

  var salt = Math.round((new Date().valueOf() * Math.random())) + "";
  var hashpass = crypto.createHash("sha512").update(pwd+salt).digest("hex");
  var sql = 'INSERT INTO user(id,pwd,name,hobby,content,salt) VALUES(?,?,?,?,?,?)';

  db.query(sql
              ,[id,hashpass,name,hobby,content,salt]
              ,function(err,result){
                if(err)console.log(err);
                db.end();
  });
  res.redirect('/');
});

router.post('/loginUser',function(req,res,next){
  var id = req.body.id;
  var pwd = req.body.pwd;
  var sql = 'SELECT * FROM user where id = ?';
  
  db.query(sql
            ,[id]
            ,function(err,result){
              if(err)console.log(err);
              if(result && result.length > 0){
                var pass = result[0].pwd;
                var salt = result[0].salt;
                var userHashPass = crypto.createHash("sha512").update(pwd+salt).digest("hex");
                
                if(userHashPass === pass && result[0].admin){
                  req.session.user = {
                                        "id" : result[0].id,
                                        "name" : result[0].name,
                                        "hobby" : result[0].hobby,
                                        "content" : result[0].content,
                                        "admin" : true
                  }
                  res.redirect('/');
                }else if(userHashPass === pass && result[0].admin == 0){
                  req.session.user = {
                    "id" : result[0].id,
                    "name" : result[0].name,
                    "hobby" : result[0].hobby,
                    "content" : result[0].content,
                    "admin" : false
                  }
                  res.redirect('/');
                }else{
                  res.render('signIn',{chk:1});
                }
              }else{
                  res.render('signIn',{chk:1});                  
              }
            }
  );
});



module.exports = router;