import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { bytesToHex } from './utils.js';
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

/**
 * Generates a new mnemonic phrase
 * @param {number} [strength=128] - Strength of the mnemonic (128, 160, 192, 224, or 256 bits)
 * @returns {string} A valid mnemonic phrase
 */
function generateMnemonics(strength = 128) {
  // Validate strength (standard BIP39 strengths)
  if (![128, 160, 192, 224, 256].includes(strength)) {
    throw new Error('Invalid mnemonic strength. Use 128, 160, 192, 224, or 256.');
  }

  // Generate mnemonic
  const mnemonics = bip39.generateMnemonic(strength);
  
  return mnemonics;
}

/**
 * Creates an Aptos account from a mnemonic phrase
 * @param {string} mnemonics - The mnemonic phrase to derive the account from
 * @param {string} [path='m/44\'/637\'/0\'/0\'/0\''] - BIP44 derivation path (Aptos standard)
 * @returns {Account} An Aptos account derived from the mnemonic
 */
function createAptosAccountFromMnemonics(mnemonics, path = "m/44'/637'/0'/0'/0'") {
  // Normalize mnemonics
  const normalizedMnemonics = mnemonics
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase())
    .join(" ");

  // Validate mnemonics
  if (!bip39.validateMnemonic(normalizedMnemonics)) {
    throw new Error("Invalid mnemonic phrase");
  }

  // Generate seed from mnemonics
  const seed = bip39.mnemonicToSeedSync(normalizedMnemonics);

  // Derive key using the specified path
  const { key } = derivePath(path, bytesToHex(seed));

  // Create Ed25519 private key
  const privateKey = new Ed25519PrivateKey(Buffer.from(key));

  // Create and return Aptos account
  const account = Account.fromPrivateKey({ privateKey });
  
  return account;
}

// If running as a script, demonstrate usage
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const mnemonics = generateMnemonics();
    console.log('Generated Mnemonics:', mnemonics);

    const account = createAptosAccountFromMnemonics(mnemonics);
    console.log('Aptos Account Address:', account.accountAddress.toString());
    console.log('Public Key:', account.publicKey.toString());
    console.log('Private Key:', account.privateKey.toString());
  } catch (error) {
    console.error('Error:', error);
  }
}

export { 
  generateMnemonics, 
  createAptosAccountFromMnemonics 
};
