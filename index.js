var { JsonRpc } = ('eosjs');
var { User } = require('universal-authenticator-library');
//import { UALJs } from 'ual-plainjs-renderer'
var {UALJs} = require('ual-plainjs-renderer');
//import { Scatter } from 'ual-scatter'
var {Scatter} = require('ual-scatter');
//import { Anchor } from 'ual-anchor'
var {Anchor} = require('ual-anchor');
//import { TokenPocket } from 'ual-token-pocket'
var {TokenPocket} = require('ual-token-pocket');
var {MockAuthenticator} = require('./build/MockAuthenticator');
//var {demoTransaction} = require('./demo-transaction')



const addRow = document.getElementById("addRow");
const submit = document.getElementById("submit");
const submit2 = document.getElementById("submit2");
const logIn = document.getElementById("login");
const logIn2 = document.getElementById('login2');
const wallet =  document.getElementById('wallet');
const rows =   document.getElementsByClassName("row");
const clear = document.querySelector("#clear");
const accName = document.getElementsByClassName("accName");
const amount = document.getElementsByClassName("amount");
const memo = document.getElementsByClassName("memo");



/*addRow.addEventListener("click", addR)
function addR(){
    const row = document.createElement("div");
    row.classList.add("row");

    const accName = document.createElement("input");
    accName.type = "text";
    accName.classList.add("accName");
    row.appendChild(accName);
    accName.style.marginRight = "2.6%";
    const amount = document.createElement("input");
    amount.type = "number";
    amount.placeholder = "0";
    amount.min = "0";
    amount.step = "any";
    amount.classList.add("amount");
    amount.style.marginRight = "2.6%";
    row.appendChild(amount);
    const memo = document.createElement("input");
    memo.type = "text";
    memo.classList.add("memo");
    row.appendChild(memo);

    document.querySelector(".rowContainer").appendChild(row);

    console.log(rows.length);
    console.log(rows[4].children[0].value.trim());
    console.log(rows[4].children[1].value.trim());
    console.log("Testing 1 2")
}*/

clear.addEventListener("click", clean)
function clean(){
  document.querySelector("form").reset();
  this.style.display = "none";
}





const TOKEN_SYMBOL = `EOS`;

   


const myCallback = arrayOfUsers => {
  // Execute on successful user authentication
  loggedInUser = arrayOfUsers[0];
 /* console.info('User Information:');
  console.info('Account Name:', loggedInUser.getAccountName());
  console.info('Chain Id:', loggedInUser.getChainId());*/
}

// mainnet chain id "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
// testnet chain id '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840'
//testnet endpoint "https: //jungle3.cryptolions.io"
//mainnet endpoint "https: //api.eospglmlt.com"
const myChain = {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  rpcEndpoints: [{
    protocol: 'https',
    host: 'api.eospglmlt.com',
    port: ''
  }]
}

const myAppName = 'My UAL App'

const scatter = new Scatter([myChain], { appName: myAppName })
const anchor = new Anchor([myChain], { appName: myAppName })
const tokenPocket = new TokenPocket([myChain], { appName: myAppName })
//const authenticator = new MockAuthenticator([myChain], { appName: myAppName })


logIn.style.visibility = "visible";
logIn2.style.visibility = "hidden";
const myAppRoot = {
  containerElement: logIn2
}

const ual = new UALJs(myCallback, [myChain], myAppName, [scatter,anchor,tokenPocket], myAppRoot)




submit.style.display = "none"




submit.addEventListener("click", send)
   async function send(){
    
    alert("sending...    Please Sign all transactions")
  
    for(let i=0; i<rows.length; i++){
      if (rows[i].children[0].value.trim()=== "") continue 
          const userAccountName = await  loggedInUser.getAccountName();
         
          let  trans =  {
            
              actions:  [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                  actor: userAccountName,
                  permission: 'active',
                }],
                data: {
                  from: userAccountName,
                  to: rows[i].children[0].value.trim(),
                  quantity: `${parseFloat(rows[i].children[1].value.trim()).toFixed(4)} ${TOKEN_SYMBOL}`,
                  memo: rows[i].children[2].value.trim()
                }
              }]
            
            }
           
           await loggedInUser.signTransaction(
             trans,
              { broadcast: true }
            )  
  }
  
  clear.style.display = "block";

}
    

    

    document.querySelector(".popup .close-btn").addEventListener("click", async function(){
      document.querySelector(".popup").classList.remove("active");

      
        const userAccountName = await loggedInUser.getAccountName();
        document.getElementById("logInStatus").innerHTML =  `&hearts; Welcome ${userAccountName}` ;
      document.getElementById("logInStatus").style.color = "green" ;
      document.getElementById("logInStatus").style.fontFamily = "Minion"
      document.getElementById("logInStatus").style.fontWeight = 600 ;
      
    });

    wallet.addEventListener("click",  wall)
     function wall(){
      if(document.getElementById("logInStatus").textContent === ""){
      this.style.visibility = "hidden"
     logIn2.style.visibility = "visible";
     
     ual.init()
    
     
     logIn.style.visibility = "hidden";
     preventConflict.staus = 1 ;
     submit.style.display = "block"
     submit2.style.display = "none"
      }
    }

    logIn.addEventListener("click", welcome)
function welcome(){
  document.querySelector(".popup").classList.add("active");
    

    }

    