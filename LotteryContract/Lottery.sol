// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract Lottery{
    address public manager ;
      address payable[] public players;

    constructor() public {
        manager = msg.sender;
    }
    function enter() payable public{
        // .01 = 0.01 ether;
        require(
            msg.value > .01 ether,
            "A minimum payment of .01 ether must be sent to enter the lottery"
        );
        players.push(payable(msg.sender));
    }

    function getArrayPlayersLength() public view returns(uint){
        return players.length;
    }

    function random() private  view returns (uint){
        return  uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }

    function pickWinner() public onlyManagerChange{
        uint index = random() % players.length;
        address contractAddress = address(this);
        players[index].transfer(contractAddress.balance);
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    } 
    // modifie
    modifier onlyManagerChange(){
        require(msg.sender == manager,"Only manager pick winner");
        _;
    }
}
