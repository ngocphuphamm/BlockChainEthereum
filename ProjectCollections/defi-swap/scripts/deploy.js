// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const ERC20Mock = artifacts.require("ERC20Mock");

const USDC_MAINNET = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNLOCKED_ACCOUNT = "0x6262998ced04146fa42253a5c0af90ca02dfd2a3";
async function main() {
  const [accountA,accountB,accountC] = await ethers.getSigners();
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
  const usdc = await ERC20Mock.at(USDC_MAINNET);
  const ContractDex = await ethers.getContractFactory("Dex");
  const contractDex = await ContractDex.deploy({value : 10000000000000000});
  await contractDex.deployed();

    // Transfer USDC from unlocked account to Dex Contract
  await usdc.transfer(dex.address, 10000000000, {
      from: UNLOCKED_ACCOUNT,
  });
  // Transfer USDC from unlocked account to user account
  await usdc.transfer(accountB, 10000000000, {
    from: UNLOCKED_ACCOUNT,
  }); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
