const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {
  // Deploy MyUpgradableToken contract
  console.log("Deploying MyUpgradableToken...");
  const MyUpgradableToken = await ethers.getContractFactory("MyUpgradableToken");
  const myUpgradableToken = await upgrades.deployProxy(MyUpgradableToken, [process.env.ADMIN_ADDRESS, "0xE592427A0AEce92De3Edee1F18E0157C05861564"]);

  await myUpgradableToken.deployed();
  console.log("MyUpgradableToken deployed to:", myUpgradableToken.address);

  // Deploy UniswapIntegration contract - replace with your actual UniswapIntegration contract
  console.log("Deploying UniswapIntegration...");
  const UniswapIntegration = await ethers.getContractFactory("UniswapIntegration");
  const uniswapIntegration = await UniswapIntegration.deploy(
    // Replace with the address of Uniswap router on the corresponding network
    "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  );

  await uniswapIntegration.deployed();
  console.log("UniswapIntegration deployed to:", uniswapIntegration.address);

  // Save the contract addresses to a JSON file for reference
  const deploymentData = {
    contractName: "MyUpgradableToken",
    contractAddress: myUpgradableToken.address,
    contractName: "UniswapIntegration",
    contractAddress: uniswapIntegration.address,
  };

  fs.writeFileSync("deployment.json", JSON.stringify(deploymentData));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
