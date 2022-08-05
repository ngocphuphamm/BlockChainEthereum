// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NGOCPHU = await hre.ethers.getContractFactory("NGOCPHU");
  const ngocphu = await NGOCPHU.deploy();
  await ngocphu.deployed();
  console.log("SUCCESS FULLY DEPLOYED SMART COTNRACT TO : " , ngocphu.address);



    //  await ngocphu.mint("https://gateway.pinata.cloud/ipfs/QmRtEqd5p7F7uq9BSdEyAsqKPTv2dvpfRwYbz352fsDFev");
    // console.log("NFT successfully minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
