const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

const viewRouter  = require('./routes/reviewRoutes')
var cookieParser = require('cookie-parser')
var user = JSON.parse(fs.readFileSync("users.txt").toString());
app.set('view engine', 'pug')
const port = 5000 ;
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
 

app.use(express.static(__dirname+'/public'))




app.post('/login', (req,res)=>{
  res.cookie("username", req.body.username)
  res.cookie("password", req.body.password)
  res.redirect('/')
})

 
app.use((req, res, next) => {
    console.log("Cookies received:", req.cookies);
    if (req.cookies.username) {
        let use = user.find((us) =>
            us.username === req.cookies.username &&
            us.password === req.cookies.password
        );
        console.log("Matched user:", use); // Log the result of `find`.
        if (use) {
            next();
        } else {
            console.log("Invalid credentials. Redirecting to login.");
            res.redirect('/login.html');
        }
    } else {
        console.log("No cookies found. Redirecting to login.");
        res.redirect('/login.html');
    }
});



app.use('/reviews', viewRouter )



app.get('/students', (req,res)=>{
    res.cookie("mycookies", "darkfantasy")
    res.send('/')
})






app.listen(port, ()=>{
    console.log(`app is running ons ports ${port}`)
})