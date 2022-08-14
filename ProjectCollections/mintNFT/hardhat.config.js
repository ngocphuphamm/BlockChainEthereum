require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.RINKEYBY_API,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan : {
    apiKey : process.env.ETHERSSCAN_API
  },
  solidity: "0.8.9",
};
