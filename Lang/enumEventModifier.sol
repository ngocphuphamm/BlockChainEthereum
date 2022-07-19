pragma solidity ^0.6.0;
contract HotelRoom{
    // vacant 
    // occupied
    event Occupy(address _occupant ,uint _value );

    enum Statuses{
        Vacant,
        Occupied
    }

    Statuses currentStatus ;
    address payable public owner;
    
    constructor() public
    {
        owner = msg.sender;
        currentStatus = Statuses.Vacant;
    }
    modifier onlyWhileVacant{
        require(currentStatus == Statuses.Vacant,'Currently occupied');
        _;
    }
    modifier cost (uint _amount){
        require(_amount >= 2 ether , "Not enough Ether provided" );
        _;
    }
    function book()  external  payable onlyWhileVacant cost(2 ether)
    {

        currentStatus = Statuses.Occupied;
        owner.transfer(msg.value);
        emit Occupy(msg.sender , msg.value);
    }
}