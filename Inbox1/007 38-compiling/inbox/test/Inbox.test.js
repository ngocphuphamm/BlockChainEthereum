const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 =  new Web3(ganache.provider());

beforeEach(()=>{
  // Get a list off all account
  web3.eth.getAccounts()
       .then(fetchedAccounts => {
          console.log(fetchedAccounts);
       });
  //Use one of those accounts to deploy

  // the constract  
})

describe('Inbox',()=>{
  it('deploy a contract',()=>{
    
  })
})




// testing example
/*
class Car{
    park(){
        return 'stopped';
    }

    drive()
    { 
        return 'vroom';
    }
}
//
let car;
beforeEach(()=>{
     car = new Car();
})
describe('Car',()=>{
    it('can park',()=>{
      assert.equal(car.park(), 'stopped');
    });

    it('can drive',()=>{
      assert.equal(car.drive(), 'vroom')
    })
})
*/