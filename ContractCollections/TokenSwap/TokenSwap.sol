// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/ngocphuphamm/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    IERC20 public token1 ; 
    address public owner1; 
    IERC20 public token2 ; 
    address public owner2 ; 

    constructor(address _token1 , address _owner1 , address _token2, address _owner2)
    public
    {
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
        owner1 = _owner1; 
        owner2 = _owner2;
    }

    function swap(uint amount1 , uint amount2) public {
        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");
        require(token1.allowance(owner1,address(this)) >= amount1,"Token 1 allowance too low");
        require(token2.allowance(owner2, address(this))>= amount2,"Token 2 allowance too low");
        // transfer token 
        // token1 , owner1 ,amount1 -> owner2 
        _safeTransferFrom(token1,owner1 ,owner2 ,amount1);
        // token2 , owner2 ,amount2 => owner1 ; 
        _safeTransferFrom(token2,owner2,owner1,amount2);
    }

    function _safeTransferFrom(IERC20 token , address sender , address recipient , uint amount) private
    {
        bool sent = token.transferFrom(sender,recipient,amount);
        require(sent,"Token transfer failed");
    }
}


/*
alice 
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
TOKEN 1
0xDA0bab807633f07f013f94DD0E6A4F96F8742B53

bob
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
TOKEN 2
0xAc40c9C8dADE7B9CF37aEBb49Ab49485eBD3510d

TOKEN SWAP 
0x8431717927C4a3343bCf1626e7B5B1D31E240406

10000000000000000000
20000000000000000000
*/
