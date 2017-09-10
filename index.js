const express      = require('express'),
      bodyParser   = require('body-parser'),
      logger       = require('morgan'),
      { mongoose } = require('./server/db/mongoose'),
      { Todo }     = require('./server/models/todo'),
      { User }     = require('./server/models/user'),
      _            = require('lodash'),
      bcrypt       = require('bcryptjs')

const app = express()
const port = 3000
app.use(logger('dev'))
app.use(bodyParser.json())

/*      HEROKU GET              */

app.get('/times', function(request, response) {
	var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
    	result += i + ' ';
        response.send(result);
});


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

app.post('/users/login', (req, res) => {
	const body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password)
		.then(user => {
			return user.generateAuthToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(400).send(e)
		})
})


app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
