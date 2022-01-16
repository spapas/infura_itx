const { ethers } = require("ethers");
const util = require('util');

async function main() {
  const itx = new ethers.providers.JsonRpcProvider(process.env.NETWORK_API);

  // Create a signer instance based on your private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, itx);
  console.log(`Signer public address: ${signer.address}`);

  // Check your existing ITX balance
  // balance is added by sending eth to the deposit address: 0x015C7C7A7D65bbdb117C573007219107BD7486f9
  // balance is deducted everytime you send a relay transaction
  const { balance } = await itx.send("relay_getBalance", [signer.address]);
  console.log(`Current ITX balance: ${ethers.utils.formatEther(balance)} MATIC`);

}

require("dotenv").config();
main();
