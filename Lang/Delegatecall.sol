pragma solidity ^0.5.13;
/*
delegatecall 
khi dung de goi se thay doi gia tri  tai contract goi 
contract bi goi khong bi anh huong 
*/

contract B{
    uint public num;
    address public sender;
    uint public value ;

    function setNewValue(uint _newNum) public payable{
        num = _newNum;
        sender = msg.sender;
        value = msg.value;
    }
}

contract B2{
    uint public num;
    address public sender;
    uint public value ;

    function setNewValue(uint _newNum) public payable{
        num = _newNum*2;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A{
    uint public num;
    address public sender ;
    uint public value ;

    function setNewValue(address _contract, uint _newNum) public payable{
        (bool success,) = _contract.delegatecall(
            abi.encodeWithSignature("setNewValue(uint256)",_newNum)
        );
        require(success,"Transaction failed");
    }
}