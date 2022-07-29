// const {expect} = require("chai");
// const {ethers} = require("hardhat");

// const {PRIVATE_KEY} = require("../config/config");
// describe("Hello World", async ()=>{
//     const message = "Hello World";
//     const messageSecond = "Bye world !!";
//     it("should return message correctly", async ()=>{
//         const HellWorld = await ethers.getContractFactory('HelloWorld');
//         const helloWorld = await HellWorld.deploy(message);
//         await helloWorld.deployed();
//         expect(await helloWorld.printHelloWorld()).to.be.equal(message);
//         // await helloWorld.updateMessage(messageSecond);
//         // expect(await helloWorld.printHelloWorld().to.be.equal(messageSecond));
//     })
// })