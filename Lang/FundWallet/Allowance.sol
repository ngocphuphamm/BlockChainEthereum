// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1; 

import "./Allowance.sol";
contract fundWallet is Allowance{
    event MoneySend(address indexed _to,uint _amount);
    event MoneyReceived(address indexed _from , uint _amount);

     function withdrawMoney(address payable _to,uint _amount) public ownerOrWhoIsAllowed(_amount)
    {
            if(!isOwner())
            {
                reduceAllowance(msg.sender,_amount);
            }
            emit MoneySend(_to,_amount);
            _to.transfer(_amount);
    }

    receive() external payable{
        emit MoneyReceived(msg.sender,msg.value);
    }
}