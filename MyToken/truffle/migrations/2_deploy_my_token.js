var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var KycContract = artifacts.require("KycContract");
require('dotenv').config({path : '../../.env'});
module.exports = async function(deployer) {
    let address = await web3.eth.getAccounts();
    
    await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSale,1,address[0],MyToken.address,KycContract.address);

    let tokenInstance = await MyToken.deployed();
    await tokenInstance.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS);




    // let myContract = await MyToken.deployed();
    // // address contract myTokenSale 
    // let balanceOfMTSBefore = await myContract.balanceOf(MyTokenSale.address);
    // // token deployer
    // let balanceOfDeployerBefore = await myContract.balanceOf(address[0]);

    // await myContract.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS);
    //     // address contract myTokenSale 
    // let balanceOfMTSAfter = await myContract.balanceOf(MyTokenSale.address);
    // // token deployer
    // let balanceOfDeployerAfter = await myContract.balanceOf(address[0]);
}