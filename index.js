import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Convert Uint8Array to hex using native JavaScript
function bytesToHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Specify which network to connect to via AptosConfig
async function example() {
 
  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const account = Account.generate(); // defaults to Legacy Ed25519
  
  // Convert address bytes to hex
  const addressHex = bytesToHex(account.accountAddress.data);
  
  // Convert private key bytes to hex
  const privateKeyHex = bytesToHex(account.privateKey.signingKey.data);
  
  // Convert public key bytes to hex
  const publicKeyHex = bytesToHex(account.publicKey.key.data);
  
  console.log('Account Address (hex):', addressHex);
  console.log('Private Key (hex):', privateKeyHex);
  console.log('Public Key (hex):', publicKeyHex);
}
 
example()

