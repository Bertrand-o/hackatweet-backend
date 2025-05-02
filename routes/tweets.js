var express = require('express');
var router = express.Router();

const Tweet = require("../models/tweets");

router.get('/', (req, res) => {
  Tweet.find().populate('users').then(data => {
   if (data){
    res.json({result: true, tweets: data})
  }  else {
    res.jons({result: false, error : "No tweet found"})
   }
  })
})

router.delete('/')