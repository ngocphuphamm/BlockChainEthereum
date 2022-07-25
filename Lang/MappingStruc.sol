pragma solidity ^0.5.3;
contract Mapping{


    struct Payment {
        uint amount ;
        uint timestamp;

    }

    struct Balance {
        uint totalBalance ;
        uint numPayments; 
        mapping(uint => Payment) payments;

    }
 
    mapping(address => Balance) public balanceReceived;

    function getBalance() public view returns (uint256)
    {
        return address(this).balance;
    }

    function sendMoney() external payable {
            balanceReceived[msg.sender].totalBalance += msg.value;
            
            Payment memory payment = Payment(msg.value,now);
            balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
            balanceReceived[msg.sender].numPayments++;
    }

    function widthdrawAllMoney(address payable _to) public{
                _to.transfer(getBalance());
    }

    function widthDrawMoney (address payable _to,uint _amount ) public{
        require(balanceReceived[msg.sender].totalBalance >= _amount ,"Not enough funds");

        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }
}pragma solidity ^0.5.3;
contract Mapping{


    struct Payment {
        uint amount ;
        uint timestamp;

    }

    struct Balance {
        uint totalBalance ;
        uint numPayments; 
        mapping(uint => Payment) payments;

    }
 
    mapping(address => Balance) public balanceReceived;

    function getBalance() public view returns (uint256)
    {
        return address(this).balance;
    }

    function sendMoney() external payable {
            balanceReceived[msg.sender].totalBalance += msg.value;
            
            Payment memory payment = Payment(msg.value,now);
            balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
            balanceReceived[msg.sender].numPayments++;
    }

    function widthdrawAllMoney(address payable _to) public{
                _to.transfer(getBalance());
    }

    function widthDrawMoney (address payable _to,uint _amount ) public{
        require(balanceReceived[msg.sender].totalBalance >= _amount ,"Not enough funds");

        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }
}