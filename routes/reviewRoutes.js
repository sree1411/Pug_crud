const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs')



router.get('/reviews', (req,res)=>{
    let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
    res.render("home", {reviews})
 })
  
 
 router.get("/addReviewForm", (req,res)=>{
    res.sendFile(path.join(__dirname, "../addReview.html"));
 })
 
 
 
 router.post('/addReview', (req,res)=>{
     let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
     reviews.push(req.body)
     fs.writeFileSync('reviews.txt', JSON.stringify(reviews))
     res.redirect('/')
 })
 
 
 
 
 router.get('/editForm/:id', (req,res)=>{
    console.log(req.params.id)
    let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
    let review = reviews[req.params.id]
    res.render("updateForm", {id:req.params.id, review:review})
 })
 
 
 router.post("/editReviewForm/:id", (req,res)=>{
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
 
 
 
 router.get('/deleteId/:id', (req,res)=>{
     let reviews = JSON.parse(fs.readFileSync("reviews.txt").toString())
     reviews.splice(req.params.id,1)
     fs.writeFileSync('reviews.txt', JSON.stringify(reviews))
     res.redirect('/')
 })

 module.exports = router;