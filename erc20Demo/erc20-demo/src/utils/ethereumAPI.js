const Decimal = require('decimal.js');
const Web3 = require("web3");
const web3 = new Web3(window.ethereum);
const applyDecimals = (rawValue,decimals,sign="negative") =>{
    if(!rawValue)
        return "";
    //10000000000000000 *  10 ** -18 = 1 
    return Decimal(rawValue).mul(Decimal(10).pow(Decimal(sign === "positive" ? decimals : -decimals))).toFixed();

}


module.exports = {
    applyDecimals,
    web3
}