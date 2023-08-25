import { useEffect, useState } from "react"
import axios from 'axios'
import logo from '../images/logo.svg'
import home from '../images/Home-white.svg'
import wallet from '../images/wallet.svg'
import tutorial from '../images/Tutorial.svg'
import logout from '../images/Logout.svg'
import hamburger from '../images/hamburger.svg'
import plusbutton from '../images/PlusButton.svg'
import menuToggle from '../images/mmtoggle.svg'

import { auth } from "./firebase"
function Reload(){
    const [credits, setcredits] = useState();
    const [email, setEmail] = useState();
    const [toggle, setToggle] = useState(false);
    auth.onAuthStateChanged((user)=>{
      if(!user){
        window.location.href ='/login'
      }
      else{
        setEmail(user.email)
      }
    })

    useEffect(()=>{
      if(email){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getUser`,{email:email})
        .then((res)=>{
            setcredits(res.data.credits)
        })
      }  
    },[email])
    function handleChange(event){
        let value = event.target.value;
        // Remove non-numeric and non-decimal characters
        value = value.replace(/[^0-9.]/g, '');       
        // Remove decimal points
        value = value.replace(/(\.*)\./g, '$1');        
        // Update the input value
        event.target.value = value;
    }
    function next(number){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkout`,{email:auth.currentUser.email,amount:number})
        .then((res)=>{
            window.location = res.data
        })
    }

    function nextInput(event){
        event.preventDefault();
        next(parseInt(event.target.creditAmount.value))
    }


    const css = `
    * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}

body {
    background-color: #3D3D3E;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    overflow-x: hidden;
}

.header {
    display: flex;
}



.one {
    width: 50vw;
    display: flex;
}

.three {
    width: 50vw;
    display: flex;
    align-items: right;
    justify-content: right;
}


.desktoplogo {
    width: 20vw;
    padding-left: 2vw;
    padding-top: 2vw;
}

.credit-container {
    display: flex;
    width: 20vw;
    padding-top: 1vw;
    justify-content: center;
    align-items: center;
}

.credits {
    color: #89CED8;
    font-family: 'Chakra Petch';
    padding-left: 0.25vw;
    text-decoration: underline;
    font-size: 1.5rem;
}

.wallet {
    height: 2vw;
}

.plus-button {
    padding-left: 0.75vw;
    height: 2vw;
}

nav {
    padding-top: 1vw;
    padding-right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tutorial-href, .logout-href {
    color: white;
    text-decoration: none;
    font-family: 'Chakra Petch';
    padding-right: 1.5vw;
    font-size: 1.5rem;
}

.home-href {
    color: white;
    font-family: 'Chakra Petch';
    padding-right: 1.5vw;
    font-size: 1.5rem;
    text-decoration: none;
}

a{
    padding-left:.25vw ;
}

.full-page-container{
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Sen';
    color: white;
    margin-top: 8vw;
}
.creditcosttext{
    display: block;
    font-size:2rem;
    margin-bottom: 1vw;
}
.creditcost{
    font-weight: 700;
}
.amounttext{
    display: block;
    font-size: 1.25rem;
}
.or{
    display: block;
    font-size: 3rem;
    margin-top: 3vw;
    margin-bottom: 3vw;
}
.input-label{
    font-family: 'Chakra Petch';
    display: block;
    padding-left: .5vw;
}
form{
    margin-top: 2vw;
}
.number{
    width: 15vw;
    padding: .5vw 0;
    border: solid .25vw #EDEEC9 ;
    border-radius: .5vw;
    font-size: 1.25rem;
    padding-left: .5vw;
}
.number:focus{
    outline: none;
    border-color: #574AE2;
    background-color: #DDDBF9;
}
.inputbutton{
    margin-left: 2.5vw;
    background-color: #796EE8 ;
    color: white;
    border: solid black .175vw;
    font-family: 'Chakra Petch';
    font-size: 1.25rem;
    padding: .5vw 0;
    border-radius: .5vw;
    box-sizing: content-box;
}
.button{
    margin-left: 2.5vw;
    background-color: #796EE8 ;
    color: white;
    border: solid black .175vw;
    font-family: 'Chakra Petch';
    font-size: 1.25rem;
    border-radius: .5vw;
    box-sizing: content-box;
    margin-bottom: 1.5vw;
    width: 12.5vw;
    padding: .5vw 0;
}
.creditbutton{
    margin-right:.5vw;
}
.plus{
    padding-left: .75vw;
    padding-right: 1vw;
}
.try{
    font-size: 1.75rem;
}
.button-container{
    display: grid;
    width: 50vw;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 2vw;
}
.button:hover{
    opacity: 0.8;
}
.inputbutton:hover{
    opacity: 0.8;
}
.home,.tutorial,.signout{
    cursor:pointer;
}
.home:hover,.tutorial:hover,.signout:hover{
    opacity: 0.8;
}
a:hover{
    opacity: 0.8;
}
@media (orientation:landscape){
  .mobile-header{
    display:none;
  }
}
@media (orientation:portrait) {
    .inputcontainer{
        display: flex;
        align-items: center;
    }
    .header {
        display: none;
    }

    .mobile-header {
        display: flex;
        justify-content: space-between;
    }
    .full-page-container{
        margin-top: 10vw;
    }
    .creditcosttext{
        font-size: 3rem;
    }
    .amounttext{
        font-size: 2rem;
        margin-top: 2vw;
        text-align: center;
        width: 90vw;

    }
    form{
        margin-top:5vw;
    }
    .input-label{
        font-size: 1.5rem;
        padding-left: 1vw;
        margin-bottom: 1vw;
    }
    .inputcontainer{
        display: block;
    }
    .number{
        display: block;
        margin: 0 auto;
        width: 70vw;
        height:10vw;
        border: solid #EDEEC9 .5vw;
        border-radius: 1vw;
        font-size: 3rem;
        padding-left: 2vw;
    }
    .inputbutton{
        display: block;
        margin: 5vw auto;
        font-size: 3.5rem;
        border: solid black .5vw;
        border-radius: 2vw;
        padding:2vw 2vw;
    }
    .button-container{
        width: 90vw;
        grid-template-columns: 1fr;
        margin-bottom: 10vw;
    }
    .button{
        margin: 3vw auto;
        font-size: 3.5rem;
        border: solid black .5vw;
        border-radius: 2vw;
        width: 60vw;
        padding: 2vw 0;
    }
    .or{
        font-size: 4rem;
        text-align: center;
        margin-bottom: 5vw;
    }
    .try{
        font-size: 2rem;
        text-align: center;
    }
    .plus{
        padding-left: 3vw;
        padding-right: 3vw;
    }
    .creditbutton{
        padding-right: 2vw;
    }
    .menuopen {
        height: 8vw;
        padding-top: 3vw;
        padding-left: 3vw;
        box-sizing: content-box;
    }

    .logo {
        padding-top: 2vw;
        padding-right: 2vw;
    }
    .credit-container{
        margin-left: 8.5vw;
    }
    .wallet {
        height: 5vw;
    }

    .credits {
        font-size: 2rem;
        padding-left: 1vw;
        white-space: nowrap;
    }

    .plus-button {
        height: 5vw;
    }
    .creditcosttext{
        width: 90vw;
        text-align: center;
    }
    .mobilemenu{
      display: block;
      z-index: 100;
      width: 60vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #3D3D3E;
      border: black solid .5vw;
      border-top-right-radius: 2vw;
      border-bottom-right-radius: 2vw;
  }
  .mmlogouticon,.mmreloadicon,.mmhomeicon,.mmtutorialicon{
      height: 10vw;
  }
  .mmlogouttext,.mmreloadtext,.mmhometext,.mmtutorialtext,.email{
      color: white;
      font-family: 'Chakra Petch';
      font-size: 3rem;
      margin-left:3vw;
  }
  .mmhome,.mmlogout,.mmtutorial,.mmreload{
      display: flex;
      align-items: center;
      margin-left: 12.5vw;
      margin-bottom: 5vw;
  }
  .mmitems{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60vw;
      height: 100vh;
  }
  .mmbottom{
      width: 60vw;
  }
  .email{
      display: block;
      text-align: center;
      margin-bottom: 5vw;
  }
  .mmtoggle{
      width: 60vw;
      height: 30vh;
      display: flex;
      align-items: center;
      justify-content: right;
  }
  .mmtogglearrow{
      height:10vh;
      margin-right: 3vw;
  }
  .mmtop{
      margin-top:10vw;
  }
  .mmreloadtext{
      color:#89CED8;
      text-decoration:underline;
  }

}

    `
    function MobileMenu(){
      if(toggle){
        console.log("errors here")
          return(
              <div className="mobilemenu">
                  <div className="mmitems">
                      <div className="mmtop">
                          <div className="mmhome">
                              <img alt="" className="mmhomeicon" src={home}/>
                              <span className="mmhometext">Home</span>
                          </div>
                          <div className="mmtutorial">
                              <img alt="" className="mmtutorialicon" src={tutorial}/>
                              <span className="mmtutorialtext">Tutorial</span>
                          </div>
                          <div onClick={()=>window.location.href='/reload'} className="mmreload">
                              <img alt="" className="mmreloadicon" src={plusbutton}/>
                              <span className="mmreloadtext">Reload</span>
                          </div>
                      </div>
                      <div onClick={()=>{setToggle(!toggle); console.log("done")}} className="mmtoggle">
                          <img alt="" className="mmtogglearrow" src={menuToggle}/>
                      </div>
                      <div className="mmbottom">
                          <span className="email">hrudai@hrudai.com</span>
                          <div onClick={()=>window.location.href='/logout'} className="mmlogout">
                              <img alt="" className="mmlogouticon" src={logout}/>
                              <span className="mmlogouttext">Logout</span>
                          </div>
                      </div>
                  </div>
              </div>
          )
      }
      else{
          return (<div style={{ display: 'none' }}></div>);
      }
    }
    return(
        <div>
            <style>
                {css}
            </style>
            
            <div className="header">
              <div className="one">
                  <img alt="" className="desktoplogo" src={logo}/>
                  <div className="credit-container">
                      <img alt="" className="wallet" src={wallet}/>
                      <span className="credits">{credits} credits</span>
                  </div>
              </div>
              <div className="three">
                  <nav>
                      <img alt="" src={home} className="home" /><a href="/" className="home-href">Home</a>
                      <img alt=""  src={tutorial} className="tutorial" /><a href="/register" className="tutorial-href">Tutorial</a>
                      <img alt="" src={logout} className="signout" /><a href="/signout" className="logout-href">Logout</a>
                  </nav>
              </div>  
          </div>
          <div className="mobile-header">
              <img alt="" onClick={()=>setToggle(!toggle)} className="menuopen" src={hamburger}/>
              <div>
                  <img alt="" className="logo" src={logo} />
                  <div className="credit-container">
                      <img alt="" className="wallet" src={wallet}/>
                      <span className="credits">{credits} credits</span>
                  </div>
              </div>
          </div>
          <div className="full-page-container">
              <span className="creditcosttext">Credits cost <span className="creditcost">$0.5 per credit</span></span>
              <span className="amounttext">please enter the amount you would like to buy.</span>
              <form>
                  <span className="input-label">Credits to Buy</span>
                  <div className="inputcontainer">
                      <input className="number" type="number" />
                      <button className="inputbutton" type="submit"><span className="plus">+</span> <span className="creditbutton">37 credits &#40;$18.5&#41;</span></button>
                  </div>
              </form>
              <span className="or">OR</span>
              <span className="try">Try one of our packages</span>
              <div className="button-container">
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">5 credits &#40;$2.5&#41;</span></button>
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">10 credits &#40;$4&#41;</span></button>
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">25 credits &#40;$10&#41;</span></button>
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">50 credits &#40;$15&#41;</span></button>
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">100 credits &#40;$30&#41;</span></button>
                  <button className="button"><span className="plus">+</span> <span className="creditbutton">200 credits &#40;$50&#41;</span></button>
              </div>
          </div>
        </div>
        
    )
}
export default Reload;