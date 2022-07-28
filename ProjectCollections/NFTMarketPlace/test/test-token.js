const {expect } = require("chai");
const {ethers} = require("hardhat");

describe("ERC20-BEP20 sample contract",function (){
    let [accountA,accountB,accountC] = [];
    let contract ;
    let totalSupply = 1000000;
    
    beforeEach(async () =>{
        [accountA,accountB,accountC] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyERC20");
        contract = await Token.deploy();
        await contract.deployed();
    })

    describe("common", ()=>{
        it("total supply should return right value ",async ()=>{
            expect(await contract.totalSupply()).to.be.equal(totalSupply);
        })
        it("balance of account A should return right value ", async ()=>{
            expect(await contract.balanceOf(accountA.address)).to.be.equal(totalSupply)
        })
        it("balance of accountB should return right value",async ()=>{
            expect(await contract.balanceOf(accountB.address)).to.be.equal(0);
        })
        it("allowance of  accountA to accountB should return right value",async()=>
        {
            expect(await contract.allowance(accountA.address,accountB.address)).to.be.equal(0);
        })
    })

    describe("ERC20 transfer",()=>{
        it("transfer should revert if amount exceeds balance",async ()=>{
            await expect(contract.transfer(accountB.address,totalSupply + 1 ))
                                .to.be.reverted;
                                // neu require co revert ra string thi
                                // to.be.revertedWith("string");
        })
        it("transfer should work correctly",async ()=>{
            let transferTx = await contract.transfer(accountB.address,amount);
            expect(await contract.balanceOf(accountA.address)).to.be.equal(totalSupply-amount);
            expect(await contract.balanceOf(accountB.address)).to.be.equal(amount);
            await expect(transferTx).to.emit(contract,"Transfer")
                                    .withArgs(accountA.address,accountB.address,amount);
        })
    })

    describe("ERC20 transferFrom",()=>{
        it("transferFrom should revert if amount exceeds balance", async () => {
            await expect(contract.connect(accountB).transferFrom(accountA.address , accountC.address,amount + 1))
                                  .to.be.reverted;
        })
        it("transferFrom should revert if amount exceeds allowance amount", async ()=>{
            await expect(contract.connect(accountB).transferFrom(accountA.address , accountC.address,amount))
                                 .to.be.reverted;
        })
        it("transferFrom should work correctly", async ()=>{
            await contract.approve(accountB.address,amount);
            let transferFromTx = await contract.connect(accountB).transferFrom(accountA.address,accountC.address,amount);
            expect(await contract.balanceOf(accountA.address)).to.be.equal(totalSupply - amount);
            expect(await contract.balanceOf(accountC.address)).to.be.equal(amount);
            await expect(transferFromTx).to.emit(contract,'Transfer')
                                        .withArgs(accountA.address,accountC.address,amount);
        })
    })

    describe("EC20 APPROVE", ()=>{
         it("approve should work correctly", async ()=>{
            const approve  = await contract.approve(accountB.address,amount);
            expect(await contract.allowance(accountA.address,accountB.address)).to.be.equal(amount)
            await expect(approve).to.be.emit(contract,"Approval")
                                        .withArgs(accountA.address,accountB.address,amount);
         })
    })
})