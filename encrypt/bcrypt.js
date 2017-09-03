const bcrypt = require('bcryptjs')

const data = {
	id:       1,
	password: 'abc1234'
}

bcrypt.genSalt(10, (error, salt) => {
	bcrypt.hash(data.password, salt, (err, hash) => {
		//console.log(hash)
	})
})

const hashedPassword = '$2a$10$J3HDvZe66hNmkhPKrR9nGercJgeI90eop2wpNG3Gyyn3p/0R0tvNy'

//  VALIDATE
bcrypt.compare(data.password, hashedPassword, (err, res) => {
	console.log(res)
})


