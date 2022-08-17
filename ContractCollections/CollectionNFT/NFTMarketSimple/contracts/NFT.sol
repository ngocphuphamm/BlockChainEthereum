pragma solidity ^0.8.0; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721.sol";
contract NFT is ERC721URIStoragem,ERC721 { 
    using Counters for Counters.Counter; 

    Counters.Counter private _orderId;
    constructor() ERC721("NGOCPHU","NP")
    {}

    function mint(string memory _tokenURI) external returns(uint) 
    {
        _orderId.increment();
        _safeMint(msg.sender,_orderId);
        _setTokenURI(_orderId,_tokenURI);
        return(_orderId);
    } 
}