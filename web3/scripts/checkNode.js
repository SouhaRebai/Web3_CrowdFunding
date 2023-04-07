const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

// Test the connection
web3.eth.getBlockNumber().then(console.log);

web3.eth.getAccounts()
  .then(accounts => {
    console.log(accounts);
  })
  .catch(error => {
    console.log(error);
  });
