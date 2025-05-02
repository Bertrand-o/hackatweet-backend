const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  date: Date,
  text: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: 0}]
})


const Tweet = mongoose.model('carts', tweetSchema)

module.exports = Tweet