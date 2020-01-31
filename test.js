const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const assert = require('assert');

const test = "foo bar baz";
console.log(`encrypting ${test}`);
encrypt.encryptStringAsync(test)
	.then(details => {
		console.log(`encrypted val ${details[1]}, encrypted key ${details[0]}`);
		return details;		
	})
	.then(details => {
		return decrypt.decryptWithEncryptedKey(details[0], details[1]);
	})
	.catch(err => assert.fail(`Unexpected error ${err}`))
	.then(decrypted => {
		console.log(`decrypted ${decrypted}`);
		assert.strictEqual(decrypted, "foo bar baz");
	});
