import { Token } from '@mui/icons-material';
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
import { useState } from 'react'
const {applyDecimals,web3} = require('../../utils/ethereumAPI');
const ERC20Token = require("./ERC20Token");
const web3Token = new web3.eth.Contract(ERC20Token.abi);

const ERC20Create = ({importToken})=>{
    const defaultDecimals = "18";
    const defaultInitialSupply = "1000000000000000000";
    const [tokenName,setTokenName] = useState("");
    const [tokenSymbol,setTokenSymbol] = useState("");
    const [tokenInitialSupply,setTokenInitialSupply] = useState(defaultInitialSupply);
    const [loading ,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [successMessage,setSuccessMessage] = useState("");
    const onClickAction = async ()=>{
        if(successMessage)
        {
            importToken(web3Token.options.address);
            return;
        }
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        const accounts = await web3.eth.getAccounts();
        try{ 
           const result =  await web3Token.deploy({
                                        data : ERC20Token.bytecode,
                                        arguments : [tokenName,tokenSymbol,tokenInitialSupply]
                                    })
                            .send({
                                from : accounts[0], 
                                
                            });
            web3Token.options.address = result._address;
            setSuccessMessage(`Token success deployed at : ${result._address}`)
        }
        catch (err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return(
        <Grid container spacing = {2}>
            <Grid item xs={2}>
                <Typography variant="h6" noWrap component="div">
                    CreateToken
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    label ="Name"
                    sx= {{m:1 , width:'25ch'}}
                    placeholder = "GOLD"
                    onChange ={(e)=>setTokenName(e.target.value)}
                ></TextField>
                <TextField
                    label ="Symbol"
                    sx={{m:1 ,width : '25ch'}}
                    placeholder = "GLD"
                    onChange = {(e)=>setTokenSymbol(e.target.value)}
                >

                </TextField>

            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Initial suppy (raw)"
                    sx ={{ m:1 , width :'30ch'}}
                    placeholder= {defaultInitialSupply}
                    type="number"
                    value={tokenInitialSupply}
                    onChange = {(e)=>setTokenInitialSupply(e.target.value)}
                ></TextField>
                <TextField
                    label="Initial suppy (adjusted)"
                    sx ={{ m:1 , width :'30ch'}}
                    value = {applyDecimals(tokenInitialSupply,defaultDecimals)}
                    type="number"
                    variant ="filled"
                    ></TextField>
                <TextField
                    label="Decimals"
                    sx ={{ m:1 , width :'10ch'}}
                    type="number"
                    value={defaultDecimals}
                    variant ="filled"
                    ></TextField>
            </Grid>
            <Grid item xs={12}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <Button
                variant="contained"
                sx={{m:1}}
                onClick={()=> onClickAction()}
                disabled={loading}
                >
                    {successMessage ? "TokenInfo" : (loading ? <CircularProgress size={25} /> : "Create")}
                    
                </Button>
            </Grid>
            
        </Grid>
    )
}
export default ERC20Create;