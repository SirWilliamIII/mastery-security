const mongoose  = require('mongoose'),
      validator = require('validator'),
      jwt       = require('jsonwebtoken')

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

const User = mongoose.model('User', UserSchema)

module.exports = { User }
