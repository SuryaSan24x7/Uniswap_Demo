// require("@nomicfoundation/hardhat-toolbox");


// /** @type import('hardhat/config').HardhatUserConfig */
// // module.exports = {
// //   solidity: "0.8.19",
// // };
// module.exports = {
//   // defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {
//       gas: 12000000,
//       blockGasLimit: 0x1fffffffffffff,
//       allowUnlimitedContractSize: true,
//       timeout: 1800000,
//     },
//     dev: {
//       url: "http://127.0.0.1:8545",
//     },
//     mumbai: {
//       url: "https://rpc-mumbai.matic.today",
//       accounts: ["dd5f1eeb194783f5962ac826bdf286e3dac0820b2912354954e6ac582718390f"],
//       gasPrice: 8000000000,
//     },
//   },
//   solidity: {
//     version: "0.8.20",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts",
//   },
//   mocha: {
//     timeout: 40000,
//   },
// };

require('dotenv').config();

require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    // dev: {
    //   url: "http://127.0.0.1:8545", //For Local Deployment using Ganache cli
    // },

    polygon_mumbai: {
      url: process.env.API_URL, //matic-Testnet Alchemy API URL 
      accounts: [process.env.PRIVATE_KEY]
    },
    // polygon_mainnet:{
    //   url:"https://rpc-mainnet.maticvigil.com", //polygon-Mainnet RPC
    //   accounts :[process.env.PRIVATE_KEY]
    // }
  },
  etherscan: {
    apiKey : {polygonMumbai:"WIXGNHX39425CPDKS5TFBDJBKMGTDWR7QI"}
  },

  solidity: {
  version: "0.8.20",
    settings: {
    optimizer: {
      enabled: true,
        runs: 200,
      },
  },
},
paths: {
  sources: "./contracts",
    tests: "./test",
      cache: "./cache",
        artifacts: "./artifacts",
  },
mocha: {
  timeout: 40000,
  },
};
