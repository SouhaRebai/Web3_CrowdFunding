/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork : 'localhost',
    networks : {
      hardhat : {
        url: "http://localhost:7545",
        chainId: 1337
      },
      localhost: {
        url: "http://localhost:8545",
        chainId: 1337
      },
      
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      
      },
    },
  },
};
