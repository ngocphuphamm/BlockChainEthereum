node 
let Web3 = require("web3");

check Web3 

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

var myContract = await new web3.eth.Contract([abi,addressCOntract])
myContract.methods.number().call()
hoac 
myContract.methods.number().call()
			   .then(console.log)
			   .catch(console.error)
// thay doi state thi send 
// con xem thi view 
myContract.methods.setNewNumber(69).send({from : "0x000"}) 
			          .then((res)=>console.log(res));

