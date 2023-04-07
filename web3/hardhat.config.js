/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork : 'localhost',
    networks : {
      hardhat : {},
      localhost: {
        url: "http://localhost:8545",
        chainId: 31337
      },
      goerli:{
        url: 'https://rpc.ankr.com/eth_goerli',
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
