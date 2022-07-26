// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1; 
import "https://github.com/ngocphuphamm/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Allowance is Ownable {
       mapping (address => uint) public allowance;
    event AllowanceChanged(address indexed _forWho,address indexed _byWhom ,uint _oldAmount ,uint _newAmount);


    function isOwner() internal view returns (bool)
    {
        return owner() == msg.sender ; 
    } 

    modifier ownerOrWhoIsAllowed(uint _amount)
    {
        require(isOwner() || allowance[msg.sender] >= _amount);
        _;
    }

    function addAllowance(address _who,uint _amount) public onlyOwner {
        allowance[_who] = _amount;
         emit AllowanceChanged(_who,msg.sender,allowance[_who],_amount);

    }

    function reduceAllowance(address _who,uint _amount) internal ownerOrWhoIsAllowed(_amount) {
        allowance[_who] -= _amount;
       emit AllowanceChanged(_who,msg.sender,allowance[_who],allowance[_who] - _amount);

    }
}