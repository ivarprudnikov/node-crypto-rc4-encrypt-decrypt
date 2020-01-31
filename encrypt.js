const crypto = require('crypto');
const cfg = require('./config');
const key = require('./key');

const generateCipherStream = async (encryptionKey) => {
	// Use `crypto.randomBytes()` to generate a random iv instead of the static iv shown here.
	const iv = null;
	return crypto.createCipheriv(cfg.algorithm, encryptionKey, iv);
}

exports.encryptStringAsync = async (clearText) => {
	const k = await key.generateRandomKeyAsync();
	const cipher = await generateCipherStream(k);
	const encryptedKey = await key.encryptKeyWithPubAsync(k);
	return new Promise((resolve, reject) => {
		let encryptedData = '';
		cipher.on('readable', () => {
		  let chunk;
		  while (null !== (chunk = cipher.read())) {
		    encryptedData += chunk.toString('hex');
		  }
		});
		cipher.on('end', () => {
		  resolve([encryptedKey, encryptedData]);
		});
		cipher.write(clearText);
		cipher.end();	
	});
}




