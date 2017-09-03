const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const oid = new ObjectID()

console.log(`ObjectID: ${oid}`)

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/willTodo')

module.exports = { mongoose }
