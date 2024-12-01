const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const port = 4000 ;
 

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 

app.get('/', (req,res)=>{
   let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
   res.render("home", {reviews})
})
 

app.get("/addReviewForm", (req,res)=>{
    res.sendFile(__dirname+'/addReviewForm.html')
})



app.post('/addReview', (req,res)=>{
    let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
    reviews.push(req.body)
    fs.writeFileSync('reviews.txt', JSON.stringify(reviews))
    res.redirect('/')
})




app.get('/editForm/:id', (req,res)=>{
   console.log(req.params.id)
   let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
   let review = reviews[req.params.id]
   res.render("updateForm", {id:req.params.id, review:review})
})


app.post("/editReviewForm/:id", (req,res)=>{
    let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
    const id = req.params.id;
    if(reviews[id]){
        reviews[id] = { ...reviews[id], ...req.body };
         fs.writeFileSync('reviews.txt', JSON.stringify(reviews));
         res.render('home', { reviews });
    }else{
        res.status(404).send('Review not found');
    }
})



app.get('/deleteId/:id', (req,res)=>{
    let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
    reviews.splice(req.params.id,1)
    fs.writeFileSync('reviews.txt', JSON.stringify(reviews))
    res.redirect('/')
})


app.listen(port, ()=>{
    console.log(`app is running ons ports ${port}`)
})