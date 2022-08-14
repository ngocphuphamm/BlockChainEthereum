require('dotenv').config();
const  Tx = require("ethereumjs-tx").Transaction;
const { secp256k1 } = require('ethereumjs-util');
const Web3 = require("web3");
const web3 = new Web3("wss://ropsten.infura.io/ws/v3/a5e9bfbbeaa44a6cb2a19ece50450da2")

const account1 = '0x03b29886a52075CaDB8B557b1e02409658341961';
const account2 = '0x53EC993dCf9c653AE765c52DEF82CFAd5C0C009D'; 

const privateKey1 = process.env.PRIVATE_KEY1;
const privateKey2 = process.env.PRIVATE_KEY2;

const privateKey1Buffer = Buffer.from(privateKey1, 'hex')
const privateKey2Buffer = Buffer.from(privateKey2, 'hex')
const execute = async ()=>{
    const balanceAC1 = await web3.eth.getBalance(account1);
    const countTransaction = await web3.eth.getTransactionCount(account1);
    // build the transaction 
    const txObject = {
        nonce : web3.utils.toHex(countTransaction) , 
        to : account2 ,
        value : web3.utils.toHex(web3.utils.toWei('1','ether')) ,
        gasLimit : web3.utils.toHex(23000),
        gasPrice  : web3.utils.toHex(web3.utils.toWei('13','gwei'))
    }
    
    const tx = new Tx(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);
    
    const serializedTransaction = tx.serialize();
    console.log(serializedTransaction);
    const  raw = '0x' + serializedTransaction.toString('hex');
    
    
    // broadcast transaction 
    const transaction = await web3.eth.sendSignedTransaction(raw);
    console.log(transaction);
}   

const execute2 = async ()=>{
    const block = await web3.eth.getBlock('latest')
    console.log({
        blockHash : block.hash,
        blockNumber : block.number
    })
}
execute2();

