pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NGOCPHU is ERC721URIStorage,Ownable {
    uint tokenId =0 ;
    constructor() ERC721("NGOCPHU","PNP") {}
    
    function mint(string memory uri ) public onlyOwner {
        _mint(msg.sender,tokenId);
        _setTokenURI(tokenId , uri);
        tokenId++;
    }
}