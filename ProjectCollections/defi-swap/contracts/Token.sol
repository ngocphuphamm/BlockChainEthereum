// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
  constructor() public ERC20('USDC Coin', 'USDC') {}
}
