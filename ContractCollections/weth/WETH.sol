
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20{
    event Deposit(address indexed account, uint amount);
    event Withdraw(address indexed account , uint aomount);

    constructor() ERC20 ("Wrapped Ether","WETH")
    {

    }

    fallback() external payable{
        deposit();

    }

    function deposit() public payable {
        _mint(msg.sender,msg.value);
        emit Deposit(msg.sender,msg.value);
    }
    
    function withdraw(uint _amount) external{
        _burn(msg.sender,_amount);
        emit Withdraw(msg.sender,_amount);
    }
}