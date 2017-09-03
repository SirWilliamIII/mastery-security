const jwt = require('jsonwebtoken')

const data = [{
	id:       1,
	password: 'abc1234'
}, {
	id:       2,
	password: 'password!'
}, {
	id:       3,
	password: 'suckitTrebek420'
}]

const salt = 'secret_sauce'

//  Encrypted
const strData = JSON.stringify(data)

const token = jwt.sign( strData, salt )

console.log(`The jwt is: ${token}`)

//  Decrypted
const decrypted = jwt.verify(token, salt)

const strDecrypt = JSON.stringify(decrypted)

console.log(`Decrypted is ${ strDecrypt }`)

if( strDecrypt == token.hash) {
	console.log('Data is safe, proceed')
} else {
	console.log('Security Breach! Do not proceed')
}

console.log(`The correct token data: ${ strDecrypt }`)


