require("@nomicfoundation/hardhat-toolbox");
const {PRIVATE_KEY} = require("./config/config");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
   networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: PRIVATE_KEY.toString() !== undefined ? [PRIVATE_KEY.toString()] : [],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: PRIVATE_KEY.toString() !== undefined ? [PRIVATE_KEY.toString()] : [],
    }
  },
};
