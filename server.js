const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const port = 5000 ;
const viewRouter  = require('./routes/reviewRoutes')

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 

app.use(express.static(__dirname+'/public'))

app.use('/', viewRouter )




app.listen(port, ()=>{
    console.log(`app is running ons ports ${port}`)
})