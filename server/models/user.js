const mongoose  = require('mongoose'),
      validator = require('validator'),
      jwt       = require('jsonwebtoken'),
      _         = require('lodash'),
      bcrypt    = require('bcryptjs')

const Schema = mongoose.Schema
const mysalt = 'secret_sauce'
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


	const token = jwt.sign({ _id: userId, access }, mysalt).toString()

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
	let decoded = jwt.verify(token, mysalt)

	return User.findOne({
		_id:             decoded._id,
		'tokens.token':  token,
		'tokens.access': 'auth'
	})
}

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this

	User.findOne({ email })
		.then(user => {
			if(!user) {
				return Promise.reject()
			}
			return new Promise((resolve, reject) => {
				bcrypt.compare(password, user.password, (err, res) => {
					if(res) {
						resolve(user)
					} else {
						reject()
					}
				})
			})
		})
}

UserSchema.pre('save', function (next) {
	const user = this

	//  Check whether the password was modified !!
	if(user.isModified('password')) {
		//  user.password
		//  user.password = hash
		//  next()
		// bcrypt.genSalt(10, (err, salt) => {
		// 	bcrypt.hash(user.password, salt, (err, hash) => {
		// 		if(user.password === hash) {
		// 			return next()
		// 		}
		// 		return 'Error'
		// 	})
		// })
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
