import { useEffect, useState } from "react"
import {useAuthUser, useAuthHeader} from 'react-auth-kit'
import axios from 'axios'
import logo from './logo.svg'
function Reload(){
    const [credits, setcredits] = useState();
    const auth = useAuthUser()
    const authHeader = useAuthHeader()
    const user = auth()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth`,{headers:{"authorization":authHeader().substring(10)}})
        .then((res)=>{
            if(!(res.data===user.username)){
                window.location.href = "/signout" 
            }
        })
        .catch((e)=>{            
            window.location.href = "/signout"           
        })
    },[])
    //get the user credits
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getUser`,{username:user.username})
        .then((res)=>{
            setcredits(res.data.credits)
        })
    },[])
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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkout`,{username:user.username,amount:number})
        .then((res)=>{
            window.location = res.data
        })
    }

    function nextInput(event){
        event.preventDefault();
        next(parseInt(event.target.creditAmount.value))
    }

    const css = `body{
        background-color: black;
      }
      .logo{
        width: 20vw;
        margin: 0;
      }
      .navbar{
        display: flex;
        justify-content: space-evenly;
        margin: 0;
        margin-bottom: 2vw;
      }
      .navhome{
        color: white;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        margin-right: 3.5vw;
      }
      .navhome:hover{
        opacity: 0.8;
      }
      .navreload{
        color: white;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        margin-right: 3.5vw;
      }
      .navreload:hover{
        opacity: 0.8;
      }
      .navsignout{
        color: white;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        margin-right: 4.5vw;
      }
      .navsignout:hover{
        opacity: 0.8;
      }
      .credits{
        color: white;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;  
      }
    .choose{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0; 
      text-align: center;
      margin: 2.5vw;
    }
    .customtext{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0; 
      text-align: center;
      margin-bottom: 5vw;
    }
    .checkout {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      margin: 0 auto;
      margin-top: 1vw;
      height: 5vw;
      border: 0;
      border-radius: .5vw;
    }
    .checkoutText{
      color: black;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 3vw;
    }
    .checkout:hover{
      opacity: 0.8;
    }
    .inputbox{
      background-color: black;
      color: white;
      border: .25vw solid white;
      border-radius: .75vw;
      width: 30vw;
      height: 3vw;
      font-size: 1.66vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding: 0;
      margin-bottom: 5vw;
      margin-left: auto;
      margin-right: auto;
      outline-color: white;
    }
    .container{
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-items: center;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      margin-bottom: 2.5vw;
    }
    .topthree{
      display: flex;
      justify-content: space-evenly;
      margin: 0;
      margin-bottom: .5vw;
    }
    .bottomthree{
      display: flex;
      justify-content: space-evenly;
      margin: 0;
    }
    .packs{
      color: black;
      width: 15vw;
      background-color: white;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 2vw; 
      margin: 0;
      border: 0;
      margin-left: .25vw;
      margin-right: .25vw;
    }
    .packs:hover{
      opacity: 0.8;
    }`

    return(
        <div>
            <style>
                {css}
            </style>
            <header class="navbar">
                <img class ="logo"src={logo}/>
                <nav>
                    <a href="/" class="navhome">Home</a>
                    <a href="/reload" class="navreload">Reload</a>
                    <a href="/signout" class="navsignout">Signout</a>
                </nav>
                <h1 class="credits">credits: {credits}</h1>
            </header>
            <div>
                <div className="container">
                    <h1 className="choose">Choose A Package</h1>
                    <div className="buttons">
                        <div className="topthree">
                            <button onClick={()=>next(5)} className="packs">5 credits</button>
                            <button onClick={()=>next(10)} className="packs">10 credits</button>
                            <button onClick={()=>next(25)} className="packs">25 credits</button>
                        </div>
                        <div className="bottomthree">
                            <button onClick={()=>next(50)} className="packs">50 credits</button>
                            <button onClick={()=>next(100)} className="packs">100 credits</button>
                            <button onClick={()=>next(200)} className="packs">200 credits</button>
                        </div>
                    </div>
                    <h1 className="customtext">Or Choose Custom Amount</h1>
                    <form onSubmit={nextInput}>
                        <input type ="text" onInput={handleChange} className="inputbox" name = "creditAmount"/>
                        <button className = 'checkout' type="submit"><span className="checkoutText">checkout</span></button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}
export default Reload;