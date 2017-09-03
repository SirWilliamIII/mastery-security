const express      = require('express'),
      bodyParser   = require('body-parser'),
      logger       = require('morgan'),
      { mongoose } = require('./db/mongoose'),
      { Todo }     = require('./models/todo'),
      { User }     = require('./models/user'),
      _            = require('lodash'),
      bcrypt       = require('bcryptjs')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())


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

/*      GET /users/me             */

app.get('/users/me', (req, res) => {
	const token = req.header('x-auth')

	User.findByToken(token)
		.then(user => {
			res.send(user)
		})
		.catch(e => {
			res.status(401).send(e)
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
