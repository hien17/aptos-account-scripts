import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { bytesToHex } from "./utils.js";
import { Ed25519PrivateKey, Ed25519Account } from "@aptos-labs/ts-sdk";

const privateKeys = [
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "956d36cd598f0a6c9f7a2e095d9a59401614665f04e7ac7eadf67df415659644",
    "wrong format private key"
]

// Specify which network to connect to via AptosConfig
async function checkingPrivateKey(privateKey) {
    if (!privateKey) {
        console.error("Skipping: Private key is required");
        return;
    }

    console.log(`\n--- Checking private key: ${privateKey.substring(0, 4)}... ${privateKey.substring(privateKey.length - 4)} ---`);

    try {
        // Setup the client
        const config = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(config);

        // Create Aptos account from private key
        // This line will throw an error if the privateKey format is invalid
        const ed25519Key = new Ed25519PrivateKey(privateKey);
        const account = Account.fromPrivateKey({ privateKey: ed25519Key, aptosConfig: config });

        console.log('✅ Valid Private Key');
        console.log('   Aptos Account Address:', account.accountAddress.toString());

    } catch (error) {
        console.error(`❌ Invalid Private Key: ${privateKey}`);
        // Optionally log the specific error for debugging
        // console.error('   Error details:', error.message);
        if (error.invalidReason) {
             console.error(`   Reason: ${error.invalidReason} (${error.message})`);
        } else {
             console.error('   Error details:', error);
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

