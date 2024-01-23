// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const fs = require("fs");
async function main() {
  const TokenDistribution = await ethers.getContractFactory("TokenDistribution");
  const tokenDistribution = await upgrades.deployProxy(TokenDistribution, [10000,process.env.ADMIN_ADDRESS]);
  
  await tokenDistribution.deployed();
  
  console.log("TokenDistribution deployed to:", tokenDistribution.address);

  // Compile the CertificateNFT contract
  const CertificateNFT = await ethers.getContractFactory("Certificate");
  const certificateNFT = await CertificateNFT.deploy()

  await certificateNFT.deployed();

  console.log("CertificateNFT deployed to:", certificateNFT.address);

  // Save the contract address to a JSON file for reference
  const deploymentData = {
    contractName_: "TokenDistribution",
    contractAddress_: tokenDistribution.address,
    contractName: "CertificateNFT",
    contractAddress: certificateNFT.address,
  };
  fs.writeFileSync("certificateNFTDeployment.json", JSON.stringify(deploymentData));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
