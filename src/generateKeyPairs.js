import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { bytesToHex } from "./utils.js";

// Specify which network to connect to via AptosConfig
async function generateKeyPair() {
 
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
  
  console.log('Aptos Account Address:', addressHex);
  console.log('Public Key:', publicKeyHex);
  console.log('Private Key:', privateKeyHex);
}
 
generateKeyPair()

