const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const obj = new ObjectID()

console.log(`ObjectID: ${obj}`)

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/willTodo')

module.exports = { mongoose }
