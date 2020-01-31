php openssl_seal with RC4 equivalent in Node.js
=======================================

https://stackoverflow.com/questions/59971512

Implementing RC4 encryption algorithm in Node.js which is analoguous to the one in PHP `openssl_seal` method:

```php
 openssl_seal ( string $data , string &$sealed_data , array &$env_keys , array $pub_key_ids [, string $method = "RC4" [, string &$iv ]] ) : int
```

Objectives:

1. Generate random key for encryption
2. Encrypt data with a generated key
3. Encrypt key with a public key (RSA)
4. Return encrypted key and encrypted data

To test:

5. Decrypt key using private key
6. Decrypt data using unencrypted key

## Reference implementation

As a starting point check how `test.js` encrypts and decrypts details.