// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable{
    mapping(address => bool) allowed ;

    function setKyc(address _address) public onlyOwner {
        allowed[_address] = true;
    }

    function nrevokeKyc(address _address) public onlyOwner {
        allowed[_address] = false;
    }

    function Kyccompleted (address _address) external view returns(bool){
        return allowed[_address];
    }
}