pragma solidity ^0.5.0;
contract Escrow{
    address agent;

    mapping (address => uint256) public deposits;    
    constructor() public {
        agent = msg.sender;
    }
    //chi co nguoi tao ra contract
    modifier onlyAgent()
    {
        require(msg.sender == agent);
        _;
    }
    //  dat coc tien 
    function deposit (address payee) public payable onlyAgent
    {
        uint256 amount = msg.value;
        deposits[payee] = deposits[payee] + amount;
    }

    // rut tien 
    function withdraw(address payable payee) public onlyAgent{
        uint256 payment = deposits[payee];
        deposits[payee] = 0;
        payee.transfer(payment);
    }
}