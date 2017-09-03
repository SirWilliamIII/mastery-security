const mongoose  = require('mongoose'),
      validator = require('validator'),
      jwt       = require('jsonwebtoken'),
      _         = require('lodash')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	email:    {
		type:      String,
		required:  true,
		trim:      true,
		minlength: 1,
		unique:    true,
		validate:  {
			validator: validator.isEmail,
			message:   '{VALUE} is not a valid email'
		}
	},
	password: {
		type:      String,
		required:  true,
		minlength: 4
	},
	tokens:   [{
		access: {
			type:     String,
			required: true
		},
		token:  {
			type:     String,
			required: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	let user = this

	const userObj = user.toObject()
	return _.pick(userObj, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	let user = this

	const access = 'auth'
	const userId = user._id.toHexString()
	const salt = 'secret_sauce'

	const token = jwt.sign({ _id: userId, access }, salt).toString()

	console.log(`The user token is ${token}`)

	user.tokens.push({
		access,
		token
	})

	console.log(`The full token with auth: ${user.tokens}`)

	return user.save()
		.then(() => {
			return token
		})
}

UserSchema.statics.findByToken = function (token) {
	const User = this
	const salt = 'secret_sauce'
	let decoded = jwt.verify(token, salt)

	return User.findOne({
		_id:             decoded._id,
		'tokens.token':  token,
		'tokens.access': 'auth'
	})
}

const User = mongoose.model('User', UserSchema)

module.exports = { User }
