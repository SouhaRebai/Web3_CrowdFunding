async function main() {
  const [deployer] = await ethers.provider.listAccounts();
  console.log("Deploying contracts with the account:", deployer);

  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();
  await crowdFunding.deployed();

  console.log("CrowdFunding contract address:", crowdFunding.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });