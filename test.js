const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const test = "foo bar baz";
console.log(`encrypting ${test}`);
encrypt.encryptStringAsync(test)
	.then(details => {
		console.log(`encrypted val ${details[1]}, encrypted key ${details[0]}`);
		return details;
	})
	.then(details => {
		return decrypt.decryptWithEncryptedKey(details[0], details[1])
	})
	.then(decrypted => {
		console.log(`decrypted ${decrypted}`)
	})

