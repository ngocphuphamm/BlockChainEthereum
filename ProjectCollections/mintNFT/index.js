const pinataSDK = require("@pinata/sdk");
require('dotenv').config()
const pinata = pinataSDK(process.env.PINATA_API_KEY,process.env.PINATA_API_SECRET);

const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./metadata/logo.png');
const options = {
    pinataMetadata: {
        name: "NFT COLLECTION ",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
const pinJSONToIPFS = (body) =>{
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
const pinFileToIPFS = ()=>{
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

const getMetaData = async () =>{
    const imageURL = await pinFileToIPFS();
    const body = {
        "name" : "block", 
        "description" : "This is my firsh logo for name ",
        "image" : imageURL,
    
    }
    const metadata = await pinJSONToIPFS(body);
    console.log(metadata);
} 

getMetaData();
// NFT1 =https://gateway.pinata.cloud/ipfs/QmRtEqd5p7F7uq9BSdEyAsqKPTv2dvpfRwYbz352fsDFev

