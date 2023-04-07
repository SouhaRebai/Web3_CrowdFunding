const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function init() {
  const address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  await helpers.setBalance(address, 1000 * 1e18);
}

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });