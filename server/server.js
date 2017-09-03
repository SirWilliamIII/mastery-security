const express = require('express'),
      bodyParser = require('body-parser'),
      { mongoose } = require('./db/mongoose'),
      { Todo } = require('./models/todo'),
      { User } = require('./models/user'),
      _ = require('lodash')

const app = express()
app.use(bodyParser.json())

/*                USER ROUTES                */

/*      POST /users             */

app.post('/users', (req, res) => {

	const body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save()
		.then(() => {
			return user.generateAuthToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(400).send(e)
		})
})

/*             TODO ROUTES                  */

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, e => {
		res.status(400).send(e)
	})
})

app.listen(3000, () => {
	console.log('Started on port 3000')
})
