const MyToken = artifacts.require("MyToken.sol");

const {chai ,expect,BN } = require("./setup_chai");

require('dotenv').config({path : '../../.env'});

contract("MyToken test", async (accounts)=>{

    const [deployerAccount , anotherAccount] = accounts;
    // console.log("accounts",accounts);
    // console.log("deployerAccount",deployerAccount);
    // console.log("anotherAccount",anotherAccount);

    // hook function 
    before(async () =>{
        this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
        
    })
    it("is possible to send tokens between accounts",async()=>{
        const sendToken = 1 ;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(anotherAccount,sendToken)).to.eventually.be.fulfilled;
        // await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        await expect(instance.balanceOf(anotherAccount)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
    })
    it("All token should be in first account",async ()=>{
        let instance = await this.myToken;

        let totalSupply = await this.myToken;
    
        await expect(  await instance.balanceOf(accounts[0])).to.be.bignumber.equal(totalSupply);
    })
    it("is not possible to send more token than available in total " , async()=>{
        let instance = await this.myToken;
        let balanceOfDeployer = instance.balanceOf(deployerAccount);
        await expect(instance.transfer(anotherAccount,new BN(balanceOfDeployer + 1 ))).to.eventually.be.rejected;
    //    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })
})


