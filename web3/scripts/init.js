const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function init() {
  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  await helpers.setBalance(address, 1000 * 1e18);
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });