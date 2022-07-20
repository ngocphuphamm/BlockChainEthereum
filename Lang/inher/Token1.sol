pragma solidity >=0.4.22 <0.9.0;
contract ERC20Token {
    string public name ;
    mapping(address => uint256) public balances;

  
    function mint() public{
        balances[tx.origin] ++;

    }
}
contract MyContract2{
    mapping(address => uint256) public balances ;
    address payable  wallet;
    address token;
    event Purchase(address indexed _buyer , uint256 _amount );
    constructor(address payable _wallet ,address _token) public 
    {
        wallet = _wallet;
        token =  _token;
    }

    function () external payable{
        buyToken();
    }
    function buyToken() public payable {
        // send ether to the wallet 
        ERC20Token _token = ERC20Token(address(token));
        _token.mint();

        /*
            ERC20Token(address(token)).mint();
        */
        wallet.transfer(msg.value);
    }
}