// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MarketPlace is ReentrancyGuard { 
    using Counters for Counters.Counter;
    // fee transaction merchant 
    address payable public immutable feeAccount ; // the account that receives fees
    uint public immutable feePercent;  //the fee percentage on sales 
    Counters.Counter public itemCount;

    struct Item { 
        uint itemId; 
        IERC721 nft; 
        uint tokenId; 
        uint price ; 
        address payable seller ; 
        bool sold ;
    }

    // itemId = > item 
    mapping(uint256 => Item) public items; 
    
    event Offered(
        uint itemId, 
        address indexed nft , 
        uint tokenId , 
        uint price , 
        address indexed seller 
    );

    event Bought(
        uint itemId , 
        address indexed nft , 
        uint tokenId , 
        uint price , 
        address indexed seller , 
        address indexed buyer 
    );


    constructor(uint _feePercent)
    {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC721 _nft , uint _tokenId , uint _price ) external nonReentrant { 
        require(_price > 0 , "Price must be greater than zero");
        itemCount.increment();
        uint256 itemId = itemCount.current();
        _nft.transferFrom(msg.sender,address(this),_tokenId);
        items[itemId] = Item(itemId,_nft,_tokenId,_price,payable(msg.sender),false);
 
        emit Offered(itemId , address(_nft),_tokenId,_price,msg.sender);
    }


    function purchaseItem(uint _itemId) external payable nonReentrant{
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        uint _itemCount = itemCount.current();
        require(_itemId > 0 && _itemId <= _itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice,"not enough ether to cover item price and market fee");
        require(!item.sold,"item already sold");
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true; 
        item.nft.transferFrom(address(this),msg.sender,item.tokenId);
        emit Bought (_itemId , address(item.nft),item.tokenId,item.price,item.seller,msg.sender);

    }

    function getTotalPrice(uint _itemId) public view returns(uint)
    {
        return (items[_itemId].price * (100 + feePercent))/100;
    }
}   
