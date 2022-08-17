pragma solidity ^0.8.0;
import"https://github.com/ngocphuphamm/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract StakingReward{
    // token nhan thuong 
    IERC20 public rewardsToken ;
    // token dat cuoc  
    IERC20 public stakingToken ; 
    
    //  ty le token duoc duc moi giay 
    uint public rewardRate = 100 ; 
    // theo doi diem lan cuoi hop dong nay duoc goi 
    uint public lastUpdateTime ;

    // pool chua token reward
    // 100*((R/100*(9-7) + R/100*(14-9)+.....)
    uint public rewardPerTokenStored;

    // s lan cuoi ma nguoi dung da thao tac voi smart contract 
    // vd : R/100*(9*7)
    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) rewards;
    
    // tong so du token trong hop dong 
    uint private _totalSupply ; 
    // ghi lai so token nguoi dung dat cuoc 
    mapping(address => uint) private _balances ; 


    constructor(address _stakingToken,address _rewardsToken)
    {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    modifier updateReward(address account)
    {
        rewardPerTokenStored = rewardPerToken();
        // cap nhat thoi gian nguoi dung tiep xuc contract 
        lastUpdateTime = block.timestamp;
        rewards[account]= earned(account);
        // cap nhat phan thuong nguoi dung 
        userRewardPerTokenPaid[account]= rewardPerTokenStored;
        _;
    }
    // tinh toan tong dang chay tren tong nguon cung
    function rewardPerToken() public view returns(uint)
    {
        if(_totalSupply==0)
            return 0 ;
        // ThuatToanRutGonCaoCap/Hinh2/S= 
        return rewardPerTokenStored + (rewardRate * (block.timestamp - lastUpdateTime)*1e18 / _totalSupply);
    }

    function earned(address account) public view returns (uint)
    {

        // userRewardPerTokenPaid lan cuoi nguoi dung tiep xuc smart contract lay s do 
        // rewardPerToken() giai thua tinh token lai suat tung ngay cua suer 
        
        // ThuatToanRutGonCaoCap/Hinh3/congthuc= 
        return (
            _balances[msg.sender] * (rewardPerToken() - userRewardPerTokenPaid[account])/1e18 
            + rewards[account]
        );
    }
    function stake(uint _amount ) external updateReward(msg.sender) {
        _totalSupply += _amount;
        _balances[msg.sender] += _amount;
        stakingToken.transferFrom(msg.sender,address(this),_amount);
    }
    
    function withdraw(uint _amount) external updateReward(msg.sender){
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;
        stakingToken.transfer(msg.sender,_amount);
    }

    function getReward() external updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        rewards[msg.sender]= 0 ;
        rewardsToken.transfer(msg.sender,reward);
    }
}