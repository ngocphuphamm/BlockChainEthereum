import styles from "../assets/Wallet.module.css";
import {ethers} from "ethers";
import {React ,useState , useEffect } from 'react';
import simple_token_abi from '../Contracts/simple_token_abi.json';
import Interactions from "./Interactions";
function Wallet(){
    const contractAddress = "0x84623D8a9CB1d71535b89002f85e9b63a9f73220";

    const [tokenName , setTokenName ] = useState("TokenNgocPhu");
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
    const [errorMessage , setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [balance,setBalance] = useState(null);

    const [provider,setProvider] = useState(null);
    const [signer , setSigner] = useState(null);
    const [contract ,setContract] = useState(null);
    const connectWalletHandler = ()=>{
        if(window.ethereum && window.ethereum.isMetaMask)
        {
            window.ethereum.request({method : 'eth_requestAccounts'})
                            .then((result)=>{
                                accountChangesHandler(result[0]);
                                setConnButtonText('Wallet Connected');
                            })
                            .catch((err)=>{
                                setErrorMessage(err);
                            })
        }
        else
        {
           
            setErrorMessage("Please Install MetaMask");
        }
    }

    const accountChangesHandler = (newAddress) => {
        setDefaultAccount(newAddress);
        updateEthers();
    }

    const updateEthers = () =>{
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        let tempSigner = tempProvider.getSigner();
        let tempContract = new ethers.Contract(contractAddress,simple_token_abi,tempSigner);

        setProvider(provider);
        setContract(tempContract);
        setSigner(tempSigner);
    }

    useEffect(() => {
        if(contract != null)
        {
            updateBalance();
            updateTokenName();
        }
    },[contract])

    const updateBalance = async () =>{
        let balanceBigN = await contract.balanceOf(defaultAccount);
        let balanceNumber = balanceBigN.toNumber();
        let decimals = await contract.decimals();
        let tokenBalance = balanceNumber / Math.pow(10,decimals);
        setBalance(tokenBalance);
    }

    const updateTokenName = async () =>{
        setTokenName(await contract.name());
    }
    return (
        <div>
                <h2>{tokenName + "ERC-20 WALLET"}</h2>
                <button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>
                {errorMessage}

                <div className={styles.walletCard}>
                    <div>
                        <h3>Address : {defaultAccount}</h3>
                    </div>
                    <div>
                        <h3>{tokenName} Balance : {balance}</h3>
                    </div>
                </div>
                <div >
                        <Interactions contract={contract}></Interactions>
                </div>
        </div>

    )
}
export default Wallet;