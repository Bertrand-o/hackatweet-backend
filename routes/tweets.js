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

router.post('/newtweet', (req, res) => {
  const newTweet = new Tweet({
    author: req.body.authorId,
    date: date.now,
    text: req.body.text,
  })
  newTweet.save().then(data => {
    res.json({result: true, tweet: data})
  })
})

router.delete('/')

module.exports = router