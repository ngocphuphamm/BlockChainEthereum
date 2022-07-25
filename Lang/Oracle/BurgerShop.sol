// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.6.0;
import "./Oracle.sol";
contract BurgerShop is Oracle{
    uint256 public normalCost = 0.2 ether;
    uint256 public deluxCost = 0.4 ether;

    enum Stages{ 
        readyToOrder, 
        makeTheBurger,
        deliverBurger
    }

    Stages public burgerShopStage = Stages.readyToOrder;


    event BoughtBurger(address indexed _from , uint256 cost);

    modifier shouldPay(uint256 _cost){
        require(msg.value >= _cost,"The burger cost more");
        _;
    }


    modifier isAtStage(Stages _stage)
    {
        require(burgerShopStage == _stage,"Not at  correct stage!");
        _;
    }
    function buyBurger() payable public shouldPay(normalCost) isAtStage(Stages.readyToOrder){
         updateStage(Stages.makeTheBurger);
         emit BoughtBurger(msg.sender,normalCost);
    }

    function buyDeluxBurger() payable public shouldPay(deluxCost) isAtStage(Stages.readyToOrder)
    {
         updateStage(Stages.makeTheBurger);
        emit BoughtBurger(msg.sender,deluxCost);
    }

    function refund(address payable _to,uint256 _cost) payable public {
         require(_cost == normalCost || _cost == deluxCost , "You are trying to refund the wrong amount !");
         uint256 currenBalance = address(this).balance;
         if(currenBalance >= _cost)
         {
           //  (bool success,)= payable(_to).call{value : _cost}("");
             _to.transfer(_cost);
           //   require(success);
         }
         else
         {
             revert("Not enough funds ! ");
         }
        assert(address(this).balance == currenBalance - _cost);
    }

    function getFund() public view returns(uint256){
        return address(this).balance;
    }
    
    function pickUpBurger() public isAtStage(Stages.deliverBurger){
        updateStage(Stages.readyToOrder);
    }

    function madeBurger() public isAtStage(Stages.makeTheBurger){
            updateStage(Stages.deliverBurger);
    }   

    function updateStage(Stages _stage)  public
    {
        burgerShopStage = _stage;
    }
}