import "../contracts/SimpleContract.sol"
contract TestSimleStorage {
    SimpleContract simpleContract = SimpleContract(DeployedAdresses.SimpleContract);
    simpleContract.set(89);
    uint expected = 89 ;

    Assert.equal(simpleContract.get(),expected , "Error");
}