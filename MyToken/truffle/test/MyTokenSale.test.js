const MyTokenSale = artifacts.require("MyTokenSale.sol");
const MyToken = artifacts.require("MyToken.sol");

const {chai ,expect,BN } = require("./setup_chai");

require('dotenv').config({path : '../.env'});

contract("MyTokenSale Test",async (accounts)=>{
    const [deployerAccount,anotherAccount] = accounts;

    it("All tokens should be EMPTY token in first commit",async () =>{
        let instance = await MyToken.deployed() ;

        expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(new BN(0));
    })
})