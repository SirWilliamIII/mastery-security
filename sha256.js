const { SHA256 } = require('crypto-js')

const data = [{
	id:       5,
	password: 'bc1234'
}, {
	id:       2,
	password: 'ffassord!'
}, {
	id: 3,
	password: 'suckitTrebek420'
}]

const salt = 'secret_sauce'

const hash = SHA256(JSON.stringify(data) + salt).toString()

const token = {
	data,
	hash
}

//  Validate
const result = SHA256(JSON.stringify(token.data) + salt).toString()

if(result == token.hash) {
	console.log('Data is safe, proceed')
} else {
	console.log('Security Breach! Do not proceed')
}

console.log(`The correct token data: ${result}`)

