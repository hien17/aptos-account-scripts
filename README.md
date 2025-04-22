Run the script with:
Install dependencies:
```bash
npm install
```
Generate an Aptos account with a Ed25519 key pair:
```bash
node src/generateKeyPairs.js
```

Generate a mnemonic phrase and an Aptos account with a Ed25519 key pair derived from the mnemonic phrase:
```bash
node src/generateMnemonics.js
```

Generate an Aptos account with a Ed25519 key pair derived from the mnemonic phrase:
```bash
node src/generateKeyPairsFromMnemonics.js "mnemonic phrase"
```

E.g. 
```shell
node src/generateKeyPairsFromMnemonics.js "auto local first depart minor bean biology taxi wrestle tail chest health"
```
```shell
Aptos Account Address: 0xc1e5aff7b9a0cc4e7ccff40f48d5917658a7493ae8f7840314785e5558b44c4a
Public Key: 0x5b20d47b222761e295dae2016b0e57e26a5f2720d12dccb476274abd4014f52d
Private Key: 0xdd7348df3e59318252598107bbd375ed3118476bbcc9ff03d36e93a2bcec1595
```

Checking private key:
```bash
node src/checkingPrivateKey.js
```

Checking private key with AIP-80 (current format):
```bash
node src/checkingPrivateKeyAIP-80.js