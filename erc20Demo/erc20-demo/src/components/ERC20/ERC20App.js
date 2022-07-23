import {useState} from "react";
import { Link, Box } from '@mui/material'
import ERC20Create from './ERC20Create'
import  ERC20MainMenu  from "./ERC20MainMenu";
const Menu = {
    Main : 0, 
    Create  : 1,
    Import : 2 
}

const ERC20App = ()=>{
    const [menu,setMenu] = useState(Menu.Main);
    const [tokenAddress , setTokenAddress] = useState("");
    
    const onClickCreate = ()=> setMenu(Menu.Create);
    return(
        <div>
            {
                menu !== Menu.Main && 
                    <Box sx={{height : "5ch"}}
                     >
                        <Link href="#" onClick={()=>setMenu(Menu.main)} sx={{m : 1}} >Back</Link> 
                     </Box>

            }
            {menu === Menu.Main && <ERC20MainMenu onClickCreate={onClickCreate} ></ERC20MainMenu>}
            {menu === Menu.Create && <ERC20Create></ERC20Create>}
        </div>
    )
}
export default ERC20App;