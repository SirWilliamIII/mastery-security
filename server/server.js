const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const _ = require('lodash')

const app = express()
app.use(bodyParser.json())

app.post('/users', (req, res) => {

	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save()
		.then(user => {
			res.send(user)
		})
		.catch(e => {
			res.status(400).send(e)
		})


})

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})

app.listen(3000, () => {
	console.log('Started on port 3000')
})