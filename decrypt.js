const crypto = require('crypto');
const cfg = require('./config');
const key = require('./key');

const generateDecipherStream = async (k) => {
	// Use `crypto.randomBytes()` to generate a random iv instead of the static iv shown here.
	const iv = null;
	return crypto.createDecipheriv(cfg.algorithm, k, iv);
}

exports.decryptWithEncryptedKey = async (encKey, encVal) => {
	const k = await key.decryptKeyWithPrivateAsync(encKey);
	const decipher = await generateDecipherStream(k);
	return new Promise((resolve, reject) => {
		let decrypted = '';
		decipher.on('readable', () => {
		  while (null !== (chunk = decipher.read())) {
		    decrypted += chunk.toString('utf8');
		  }
		});
		decipher.on('end', () => {
		  resolve(decrypted);
		});
		decipher.write(encVal, 'hex');
		decipher.end();
	});
}
