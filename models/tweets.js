const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  date: Date,
  text: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})


const Tweet = mongoose.model('tweets', tweetSchema)

module.exports = Tweet