const MyTokenSale = artifacts.require("MyTokenSale.sol");
const MyToken = artifacts.require("MyToken.sol");
const KycContract = artifacts.require("KycContract.sol");
const {chai ,expect,BN } = require("./setup_chai");

require('dotenv').config({path : '../.env'});

contract("MyTokenSale Test",async (accounts)=>{
    const [deployerAccount,anotherAccount] = accounts;

    it("All tokens should be EMPTY token in first commit",async () =>{
        let instance = await MyToken.deployed() ;

        expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(await new BN(0));
    })

    it("All tokens should be in the TokenSale smart contract by default",async ()=>{
        let instance = await MyToken.deployed() ;
        let totalSupply = await instance.totalSupply();

        let balanceTokenSaleSC = await instance.balanceOf(MyTokenSale.address);

        await expect(balanceTokenSaleSC).to.be.a.bignumber.equal(totalSupply);
        
    })

     it("can't possible to buy one token if you're not in whitelist",async ()=>{
        let instance = await MyToken.deployed() ;
        let tokenSaleInstance = await MyTokenSale.deployed();

        let balanceBefore = await instance.balanceOf.call(anotherAccount);
        
        await expect(tokenSaleInstance.sendTransaction({
            from : anotherAccount,
            value : web3.utils.toWei("1","wei")
        })).to.be.rejected;

        await expect(balanceBefore).to.be.bignumber.equal(await instance.balanceOf.call(anotherAccount));
    })

    it('should be possible to buy one token by simply sending ether to the smart contract after adding to whitelist',async ()=>{
        let instance = await MyToken.deployed() ;
        let tokenSaleInstance = await MyTokenSale.deployed();

        let balanceBefore = await instance.balanceOf.call(anotherAccount);
        
        let KycContractInstance = await KycContract.deployed();
        
        await KycContractInstance.setKyc(anotherAccount);

        await expect(tokenSaleInstance.sendTransaction({
            from : anotherAccount,
            value : web3.utils.toWei("1","wei")
        })).to.be.fulfilled;

        await expect(balanceBefore + 1 ).to.be.bignumber.equal(await instance.balanceOf.call(anotherAccount));
    })

})