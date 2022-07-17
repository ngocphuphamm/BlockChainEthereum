// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;
contract SimpleStorage{
    uint256 public favoriteNumber;
    bool favoriteBool;
    
    // struct
    struct People{
        uint256 favoriteNumber;
        string name ;
    }


    // array
    People [] public people;
    // maping
    mapping(string => uint256) public nameToFavoriteNumber;

    People public person =  People({favoriteNumber : 3 , name : "ngocphu"});

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns(uint256){
         return favoriteNumber;
    }


    function addPerson(string memory _name , uint256 _favoriteNumber) public 
    {
        people.push(People({favoriteNumber : _favoriteNumber, name : _name}));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}