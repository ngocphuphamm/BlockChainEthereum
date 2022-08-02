// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
interface SignWallet{
    event Deposit(address indexed sender , uint amount , uint balance );
    event SubmitTransaction(address indexed owner ,uint indexed txIndex , address indexed to , uint256 value , bytes data );
    event RevokeConfirmation(address indexed owner , uint indexed txIndex);
    event ExcuteTransaction(address indexed owner , uint indexed txIndex);
    event ConfirmTransaction(address indexed owner , uint indexed txIndex);

    function submitTransaction(address to,uint value , bytes memory data) external  ;
    function confirmTransaction(uint transactionId) external  ;
    function executeTransaction(uint transactionId) external ;
    function revokeConfirmation(uint transactionId) external; 
}