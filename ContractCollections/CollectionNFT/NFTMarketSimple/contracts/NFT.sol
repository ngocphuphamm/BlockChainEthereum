pragma solidity ^0.8.0; 
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT is ERC721URIStorage { 
    using Counters for Counters.Counter; 

    Counters.Counter public _orderId;
    constructor() ERC721("NGOCPHU","NP")
    {}

    function mint(string memory _tokenURI) external returns(uint) 
    {
        _orderId.increment();
        uint orderId = _orderId.current();
        _safeMint(msg.sender,orderId);
        _setTokenURI(orderId,_tokenURI);
        return(orderId);
    } 
}