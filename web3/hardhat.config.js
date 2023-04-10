/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork : 'gochain',
    networks : {
      hardhat : {
        chainId: 1337
      },
      localhost: {
        url: "http://localhost:8545",
        chainId: 1337
      },
      gochain: {
        url: "http://localhost:8545",
        chainId: 31337
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
