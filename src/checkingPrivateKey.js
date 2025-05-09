import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { bytesToHex } from "./utils.js";
import { Ed25519PrivateKey, Ed25519Account } from "@aptos-labs/ts-sdk";

const privateKeys = [
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "956d36cd598f0a6c9f7a2e095d9a59401614665f04e7ac7eadf67df415659644",
    "ed25519-priv-0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "ed25519-priv-956d36cd598f0a6c9f7a2e095d9a59401614665f04e7ac7eadf67df415659644",
    "wrong format private key"
]

// Specify which network to connect to via AptosConfig
async function checkingPrivateKey(privateKey) {
    if (!privateKey) {
        console.error("Skipping: Private key is required");
        return;
    }

    console.log(`\n--- Checking private key: ${privateKey.substring(0, Math.min(10, privateKey.length))}... ---`);
    
    try {
        // Check if this is already an AIP-80 formatted key
        if (privateKey.startsWith("ed25519-priv-")) {
            // This is already using the new AIP-80 standard
            const config = new AptosConfig({ network: Network.TESTNET });
            const ed25519Key = new Ed25519PrivateKey(privateKey);
            const account = new Ed25519Account({ privateKey: ed25519Key });
            
            console.log('✅ Valid Private Key (AIP-80 Standard)');
            console.log('   Account Address:', account.accountAddress.toString());
            console.log('   Private Key:', bytesToHex(account.privateKey.signingKey.data));
            console.log('   Public Key:', bytesToHex(account.publicKey.key.data));
            return;
        } else {
            // This is using the old standard without the prefix
            const config = new AptosConfig({ network: Network.TESTNET });
            const ed25519Key = new Ed25519PrivateKey(privateKey);
            const account = new Ed25519Account({ privateKey: ed25519Key });
            
            console.log('✅ Valid Private Key (Old Standard)');
            console.log('   Account Address:', account.accountAddress.toString());
            console.log('   Private Key:', bytesToHex(account.privateKey.signingKey.data));
            console.log('   Public Key:', bytesToHex(account.publicKey.key.data));
            return;
        }
    } catch (error) {
        // Key is invalid
        console.error(`❌ Invalid Private Key: ${privateKey}`);
        if (error.invalidReason) {
            console.error(`   Reason: ${error.invalidReason} (${error.message})`);
        } else {
            console.error(`   Error: ${error.message}`);
        }
    }
}

// Wrap the loop in an async function to use await
async function main() {
    for (const privateKey of privateKeys) {
        await checkingPrivateKey(privateKey);
    }
}

main(); // Execute the async main function

