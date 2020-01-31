const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const cfg = require('./config');

// Key length is dependent on the algorithm.
exports.generateRandomKeyAsync = async () => {
	return new Promise((resolve, reject) => {
		crypto.scrypt(cfg.password, cfg.salt, 24, (err, derivedKey) => {
	    	if (err) reject(err);
	    	resolve(derivedKey.toString('hex'));
		});
	});
}

exports.encryptKeyWithPubAsync = async (text) => {
	return new Promise((resolve) => {
		fs.readFile(path.resolve('./public_key.pem'), 'utf8', (err, publicKey) => {
			if (err) throw err;
			const buffer = Buffer.from(text, 'utf8');
  			const encrypted = crypto.publicEncrypt(publicKey, buffer);
  			resolve(encrypted.toString('base64'));	
		});
	});
}

exports.decryptKeyWithPrivateAsync = async (encryptedKey) => {
 	return new Promise((resolve) => {
		fs.readFile(path.resolve('./private_key.pem'), 'utf8', (err, privateKey) => {
			if (err) throw err;
			const buffer = Buffer.from(encryptedKey, 'base64')
			const decrypted = crypto.privateDecrypt({
				key: privateKey.toString(),
				passphrase: '',
			}, buffer);
			resolve(decrypted.toString('utf8'));
		});
 	});
}