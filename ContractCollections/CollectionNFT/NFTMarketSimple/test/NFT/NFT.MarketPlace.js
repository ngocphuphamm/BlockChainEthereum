const { expect } = require("chai"); 
const { ethers } = require("hardhat");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);
let NFT ,nft , Marketplace , marketplace , deployer,feePercent =1 , URI ="sample URI",account1,account2,listAccount


describe('NFTMarketPlace',function(){

  beforeEach(async ()=>{
    NFT = await ethers.getContractFactory("NFT");
    Marketplace = await ethers.getContractFactory("MarketPlace");
    [deployer,account1,account2,...listAccount] = await ethers.getSigners();

    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
    
})

  describe("Deployment",()=>{
    it("should track name and symbol of the nft collection",async function(){
      const nameNFT = "NGOCPHU";
      const symbol = "NP";
      expect(await nft.name()).to.equal(nameNFT);
      expect(await nft.symbol()).to.equal(symbol);
    })

    it("Should track feeAccount and feePercent of the marketplace ",async  ()=>{
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    }); 
  })
  
  describe('Minting NFT',()=>{
    it("Should track each minted NFT", async function (){
         // addr1 mints an nft
         await nft.connect(account1).mint(URI)
         expect(await nft._orderId()).to.equal(1);
         expect(await nft.balanceOf(account1.address)).to.equal(1);
         expect(await nft.tokenURI(1)).to.equal(URI);
         // addr2 mints an nft
         await nft.connect(account2).mint(URI)
         expect(await nft._orderId()).to.equal(2);
         expect(await nft.balanceOf(account2.address)).to.equal(1);
         expect(await nft.tokenURI(2)).to.equal(URI);
    })
  
  })
  describe('Making marketplace items',()=>{
    let price = 1 ; // 1 ethers
    let result ; 
    beforeEach(async ()=>{
      await nft.connect(account1).mint(URI);
      await nft.connect(account1).setApprovalForAll(marketplace.address,true);

    })

    it("Should track newly created item ,transfer NFT from seller to marketplace and emit Offerd event" , async()=>{
      // Owner of NFT should now be the marketplace
      await expect(await marketplace.connect(account1).makeItem(nft.address,1,toWei(price)))
                                .to.emit(marketplace,"Offered")
                                .withArgs(    1,
                                  nft.address,
                                  1,
                                  toWei(price),
                                  account1.address)
         // Owner of NFT should now be the marketplace                            
      await expect(await nft.ownerOf(1)).to.equal(marketplace.address)
      // Item count should now equal 1
      await expect(await marketplace.itemCount()).to.equal(1);
       // Get item from items mapping then check fields to ensure they are correct
      const item = await marketplace.items(1);
      await expect(item.itemId).to.equal(1);
      await expect(item.nft).to.equal(nft.address);
      await expect(item.tokenId).to.equal(1);
      await expect(item.price).to.equal(toWei(price));
      await expect(item.sold).to.equal(false);
    })
  })
  it("Should fail if price is set to zero",async function ()
  {
    await expect(marketplace.connect(account1).makeItem(nft.address,1,0)).to.be.revertedWith("Price must be greater than zero")
  })
  describe("Purchasing marketplace items",()=>{
    let price = 2 ; 
    let fee = (feePercent/100) * price;
    let totalPriceInWei;

    beforeEach(async ()=>{
      // account1 1 mint nft 
      await nft.connect(account1).mint(URI);
      await nft.connect(account1).setApprovalForAll(marketplace.address,true);
      await marketplace.connect(account1).makeItem(nft.address,1,toWei(2));
    })
    it("Should update item as sold ,pay seller , transfer NFT to buyer , charge fees and emit a Bounus event",async ()=>{
      const sellerInitalEthBal = await account1.getBalance();
      const feeAccountInitialEthBal = await deployer.getBalance();
      // fetch item total price(market fees + item price )
      totalPriceInWei = await marketplace.getTotalPrice(1);
      // account2 purchase item 
      await expect(marketplace.connect(account2).purchaseItem(1,{value : totalPriceInWei}))
                                                .to.emit(marketplace,"Bought")
                                                .withArgs(1,nft.address,1,toWei(price),account1.address,account2.address);
      const sellerFinalEthBal = await account1.getBalance();
      const feeAccountFinalEthBal = await deployer.getBalance();
      // Item should be marked as sold 
      expect((await marketplace.items(1)).sold).to.equal(true);
      expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitalEthBal))
      expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal))
      expect(await nft.ownerOf(1)).to.equal(account2.address);
    })
    it("Should fail for invalid ids, sold items and when not enough ether is paid ",async ()=>{
     await expect(
      marketplace.connect(account2).purchaseItem(2, {value: totalPriceInWei})
    ).to.be.revertedWith("item doesn't exist");
      await expect(marketplace.connect(account2).purchaseItem(0,{value : totalPriceInWei}))
                                                .to.be.revertedWith("item doesn't exist");  
      await expect(marketplace.connect(account2).purchaseItem(1,{value : toWei(price)}))                        
                                                 .to.be.revertedWith("not enough ether to cover item price and market fee"); 
      
      await marketplace.connect(account2).purchaseItem(1,{value : totalPriceInWei});
      const account3 = listAccount[0];
      await expect(marketplace.connect(account3).purchaseItem(1,{value : totalPriceInWei}))
                                                  .to.be.revertedWith("item already sold");
    })
  })
  
})

