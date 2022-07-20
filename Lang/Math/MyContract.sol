pragma solidity 0.5.1;
import "./SafeMath.sol";
contract MyContract{
    using SafeMath for uint256;
    uint256 value ;
    
    function caculate(uint _val1 ,uint _val2) public {
        value = _val1.div(_val2);

    }
}