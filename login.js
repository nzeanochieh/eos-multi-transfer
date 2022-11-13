Buffer = Buffer.Buffer;



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
const keyLogIn =  document.getElementById('keyLogIn');
const notice =   document.querySelector(".notice");


addRow.addEventListener("click", addR)
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

    /*console.log(rows.length);
    console.log(rows[4].children[0].value.trim());
    console.log(rows[4].children[1].value.trim());
    console.log("Testing 1 2")*/
}

clear.addEventListener("click", clean)
function clean(){
  document.querySelector("form").reset();
  this.style.display = "none";
 
}


let preventConflict = {staus: 0};


const TOKEN_SYMBOL = `EOS`;


keyLogIn.addEventListener("click", logInKey)
     function logInKey(){
if(document.getElementById("logInStatus").textContent === "" && preventConflict.staus === 0){
      const from = document.getElementById('name').value.toLowerCase().trim();
      const key = document.getElementById('key').value;
      const   endpoint = "https://api.eospglmlt.com"



      console.log(from)
      if(!from || !from.length) return alert('Invalid account');
      if(!key || !key.length) return alert('Invalid key');

document.getElementById("logInStatus").innerHTML = `&hearts; Welcome ${from}` ;
document.getElementById("logInStatus").style.color = "green" ;
document.getElementById("logInStatus").style.fontFamily = "Minion"
document.getElementById("logInStatus").style.fontWeight = 600 ;
logIn.style.visibility = "hidden";
submit.style.display = "none"
submit2.style.display = "block"


     

    
submit2.addEventListener("click", send2)
      async function send2(){

      // const fromm = document.getElementById('name').value.trim();
     // const  key = document.getElementById('key').value.trim();
    // const   endpoint = "https://jungle3.cryptolions.io:443"
 
   alert("Sending...")

       // loggedInByKey = true;
       // if(loggedInByKey === true) {

      try {
          const rpc = new eosjs_jsonrpc.JsonRpc(endpoint);
          const signatureProvider = new eosjs_jssig.JsSignatureProvider([key]);
          const api = new eosjs_api.Api({ rpc, signatureProvider });

         

          for(let i=0; i<rows.length; i++){
            if (rows[i].children[0].value.trim()=== "") continue 

           
              const result = await api.transact({
                  actions:[{
                          // TODO: CHANGE TOKEN ACCOUNT/CONTRACT HERE
                          account: 'eosio.token',
                          name: 'transfer',
                          authorization: [{
                              actor: from,
                              permission: 'active',
                          }],
                          data: {
                              from: from,
                              to: rows[i].children[0].value.toLowerCase().trim(),
                              quantity: `${parseFloat(rows[i].children[1].value.trim()).toFixed(4)} ${TOKEN_SYMBOL}`,
                              memo: rows[i].children[2].value.trim()
                          }
                        } ] 
                        
                      },{
                  blocksBehind: 3,
                  expireSeconds: 30,
                  // sign:false,
                  // broadcast:false,
                  useOldRPC:true,
                  useOldSendRPC:true,
                
              });

              console.log('result', result);
              clear.style.display = "block";
              
            } 
          
      } catch(e) {
          console.error('You encountered an error!', e);
          alert("Oops! an error occured, please make sure your inputs are correct and your account is powered up");
      }

      notice.style.visibility = "visible";
       
      setTimeout(
       function() {notice.style.visibility = "hidden"}  ,
     3000 );
    }
   

    //}
  }
  
  }