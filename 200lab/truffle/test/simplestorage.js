contract("SimpleStorage",accounts => {
    it("..should store the value 89 ",async () => {
        const SimpleStorageInstance  = await SimpleStorage.deployed();

        // Set value 89 
        await simpleStorageInstance.set(89,{from : accounts[0]});

        //Get stored value 
        const storedData = await SimpleStorageInstance.get.call();

        assert.equal(storedData,89,"The value 89 was not stored");
    })
})