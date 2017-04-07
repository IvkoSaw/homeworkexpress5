var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.get('/', function (req,res) {
    if(req.cookies.user && req.cookies.userPass){
        var userName = req.cookies.user;
        var userNameStr = JSON.stringify(userName);//without this userName = undefined;
        userNameStr = userNameStr.substring(1,userNameStr.length-1);//without this userNameStr = "Ivan"
        res.send('Привет, '+userNameStr);
    }else{
        res.redirect('http://localhost:3000/signUp')
    }
})

app.get('/signup', function (req,res) {
    res.render('indexUp');
});
//server validation
app.post('/signUp', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var rePassword = req.body.rePassword;
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    if(name.length <= 1 || !validateEmail(email) || password.length < 6 || password != rePassword || rePassword == ""){
        res.status(406);
        res.send('validation error');
    }
    res.cookie('user',name);
    res.cookie('userPass',email);
    res.send('success');
})

app.listen(3000);