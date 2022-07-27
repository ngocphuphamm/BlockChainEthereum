var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
require('dotenv').config({path : '../../.env'});
module.exports = async function(deployer) {
    console.log(deployer);
    let address = await web3.eth.getAccounts();
    
    await deployer.deploy(MyToken,process.env.INITIAL_TOKENS);
    await deployer.deploy(MyTokenSale,1,address[0],MyToken.address);

    let myContract = await MyToken.deployed();
    // address contract myTokenSale 
    let balanceOfMTSBefore = await myContract.balanceOf(MyTokenSale.address);
    // token deployer
    let balanceOfDeployerBefore = await myContract.balanceOf(address[0]);

    console.log("---before transfer ---- ");

    console.log('balanceOfMTSBefore',balanceOfMTSBefore.toString());
    console.log('balanceOfDeployerBefore',balanceOfDeployerBefore.toString());

    console.log('--------');
    await myContract.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS);
        // address contract myTokenSale 
    let balanceOfMTSAfter = await myContract.balanceOf(MyTokenSale.address);
    // token deployer
    let balanceOfDeployerAfter = await myContract.balanceOf(address[0]);

    console.log("---after transfer ---- ");

    console.log('balanceOfMTSAfter',balanceOfMTSAfter.toString());
    console.log('balanceOfDeployerAfter',balanceOfDeployerAfter.toString());
}