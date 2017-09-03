const bcrypt = require('bcryptjs')

const data = {
	id:       1,
	password: 'abc1234'
}

bcrypt.genSalt(10, (error, salt) => {
	bcrypt.hash(data.password, salt, (err, hash) => {
		console.log(hash)
	})
})

// //  VALIDATE
// bcrypt.compare(data.password, hashedPassword, (err, res) => {
// 	console.log(res)
// })


