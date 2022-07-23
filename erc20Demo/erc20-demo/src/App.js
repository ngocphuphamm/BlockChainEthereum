import {useState , useEffect} from "react";
const Web3 = require("web3");


function App() {
  const [walletConnected,setWalletConnected] = useState(false);
  const [instruction , setInstruction] = useState("Waiting for connection with wallet .."); 

  useEffect (()=>{
    const connectWallet = async () =>{
      if(!window.ethereum)
        return ; 

      try{
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
      }
      catch(err)
      {
        setInstruction("Wallet connection denied,reload the page to try again");
        return ;
      }
      setInstruction("");
      setWalletConnected(true);
    }
    connectWallet();
  })
  return (
    <div className="App">
      {
        window.ethereum ? 
        (walletConnected ? 
            <h1>Connected</h1>
          : instruction
        ) : "Metamask or orther EIP-1102 / EIP-1193 compilant wallet not found "
      }
    </div>
  );
}

export default App;
