const CryptoJS = require("crypto-js");

const data = [{
	id:       1,
	password: 'abc1234'
}, {
	id:       2,
	password: 'password!'
}, {
	id: 3,
	password: 'suckitTrebek420'
}]

const salt = 'secret_sauce'

//  Encrypt
const encryptedText = CryptoJS.AES.encrypt(JSON.stringify(data), salt);

console.log(`The encrypted text is ${encryptedText}`)

//  Decrypt
var bytes = CryptoJS.AES.decrypt(encryptedText.toString(), salt);

console.log(`Bytes: ${bytes}`)

var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

console.log(`The decrypted is ${decryptedData}`)


if( decryptedData == encryptedText ) {
	console.log('Data is safe, proceed')
} else {
	console.log('Security Breach! Do not proceed')
}

console.log(`The correct token data: ${ decryptedData }`)


