var express = require('express');
var router = express.Router();

const Tweet = require("../models/tweets");
const User = require("../models/users")

router.get('/', (req, res) => {
  Tweet.find().populate('author').populate('likes').then(data => {
   if (data){
    res.json({result: true, tweets: data})
  }  else {
    res.json({result: false, error : "No tweet found"})
   }
  })
})

router.post('/newtweet/:authortoken', (req, res) => {
  const date = new Date(Date.now())

  User.findOne({token: req.params.authortoken})
  .then(data => {
    const newTweet = new Tweet({
      author: data._id,
      date: date,
      text: req.body.text,
    })
    newTweet.save().then(data => {
      res.json({result: true, tweet: data})
    })
  })


})

router.delete('/deletetweet/:tweetId', (req, res)=> {
  Tweet.findOne({_id: req.params.tweetId}).then(data => {
    if (data === null){ 
    res.json({result : false})  
    } else {
    Tweet.deleteOne({_id: req.params.tweetId }).then(() =>{
      res.json({result : true}) 
    })  
    }
  })
})

router.put('/likes/:tweetId', (req, res) => { 
  User.findOne({token: req.body.token}).then(data => {
    const userId = data._id
    Tweet.findById(req.params.tweetId).then(data => {
      if (!data.likes.includes(userId)) {
        Tweet.updateOne({_id: req.params.tweetId}, { $push: { likes: userId } })
        .then(data => {
          res.json({result: true, tweet: data})
        })
      } else {
        Tweet.updateOne({_id: req.params.tweetId}, { $pull: { likes: userId } })
        .then(data => {
          res.json({result: false, tweet: data})
        })
      }
    }); 
  })
}); 

router.get('/trends', (req, res)=> {
  const pattern = /#\w+/i
  let trends = []
  Tweet.find({ text: { $regex: /#\w+/, $options: 'i' } })
  .then(data => {
    for (const tweet of data) {
      trends.push(tweet.text.match(pattern))
    }
    res.json({result: true, trends: trends})
  })
})

router.get('/trends/:trend', (req,res) => {
  const trend = req.params.trend
  Tweet.find({ text: new RegExp(`#${trend}\\b`)})
  .then(data => {
    if (data.length === 0) {
      res.json({result: false})
    } else {
      res.json({result: true, tweets: data})
    }
  })
})


module.exports = router