# binomic-js
Very basic Mnemonic script that goes from binary to Mnemonic and back again.


WARNING: This repository isn't in any remotely working condition.  I've created it because while the idea initially seemed cool, in practice the idea of having a 100+ word representation of a private key wasn't all that practical.  If someone is going to need to save 100 words, they might as well just save the base64 version of the key instead, right?

Oh - and this approach is bound to be loaded with security issues!!

My original goal here was to do something similar to BIP39, that wasn't limited to the size of the binary data being converted (within reason of course)

Very rough code snippets that probably don't work.  I'll try to improve this later.

```
const algorithm = { 
    name: 'ECDSA', 
    namedCurve: 'P-256',
    hash: {name: "SHA-256"},
};


const keyPair = await crypto.subtle.generateKey(algorithm, true, ['sign','verify']);

const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
    
const binaryString = arrayBufferToBinary(privateKey);


const mnemonic = binaryToMnemonic(binaryString);

// Decoded mnEMONIC.  ¯\_(ツ)_/¯
demonic = mnemonicToBinary(preamble + moniker); 

let importedPrivateKey = binaryToArrayBuffer(demonic);

const privateCryptoKey = await crypto.subtle.importKey('pkcs8', importedPrivateKey, algorithm, true, ['sign']);

let signature = await crypto.subtle.sign(algorithm, privateCryptoKey, new TextEncoder().encode('your data to sign'));

signature = arrayBufferToBase64(signature)

console.log("signature: " + signature);


```