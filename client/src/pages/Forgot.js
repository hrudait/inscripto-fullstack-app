import { useState, useEffect } from "react"
import axios from 'axios'

function Forgot(){
    const css = `
   
    body{
        background-color: black;
    }
    .box{
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    
        align-items: center;
    }
    
    .t1{
        color:white;
        font-family:'Open Sans';
        font-weight:400;
        font-size:2vw;
        margin:0;
        margin-bottom: .1vw;
    }
    .t2{
        color:white;
        font-family:'Open Sans';
        font-weight:400;
        font-size:1.25vw;
        margin:0;
        margin-bottom: .1vw;
    }
    .t3{
        color:white;
        font-family:'Open Sans';
        font-weight:400;
        font-size:.75vw;
        margin:0;
        margin-bottom:.5vw;
    }
    .send {
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
      .sendtext{
        color: black;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 2.5vw;
        
      }
      .send:hover{
        opacity: 0.8;
      }
      .verify {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        margin: 0 auto;
        margin-top: .5vw;
        height: 2.5vw;
        border: 0;
        border-radius: .5vw;
      }
      .verifytext{
        color: black;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 1.5vw;
        
      }
      .verify:hover{
        opacity: 0.8;
      }
      .searchTermtext{
        color: white;
        font-size: 1.5vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin-top: 2vw;
        text-align: center;
      }
      .passwordtext{
        color: white;
        font-size: 1.5vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin-top: 0vw;
        text-align: center;
      }
      .searchTerm{
        background-color: black;
        color: white;
        border: .15vw solid white;
        border-radius: .25vw;
        width: 100%;
        height: 3vw;
        font-size: 1vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        padding: 0;
        padding-left: 2.5%;
        margin-bottom: 1vw;
        outline-color: white;
        box-sizing: border-box;
        
      }
      .newpassword{
        background-color: black;
        color: white;
        border: .15vw solid white;
        border-radius: .25vw;
        width: 100%;
        height: 3vw;
        font-size: 1vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        padding: 0;
        padding-left: 2.5%;
        margin-bottom: 1vw;
        outline-color: white;
        box-sizing: border-box;
      }
      @media (orientation: portrait){
        .t1{
          font-size: 8vw;
          width: 90vw;
        }
        .t2{
          font-size: 5vw;
        }
        .t3{
          font-size: 3vw;
          margin-bottom: 2vw;
        }
        .searchTerm{
          height: 10vw;
          font-size: 5vw;
        }
        .send{
          width: 50vw;
          height: 10vw;
          background-color: white;
        }
        .sendtext{
          font-size: 5vw;
        }
        .searchTermtext{
          font-size: 5vw;
          margin-top: 5vw;
        }
        .newpassword{
          height: 10vw;
          font-size: 5vw;
        }
        .passwordtext{
          font-size: 5vw;
          margin-top: 2vw;
        }
        .verify{
          height: 10vw;
          width: 50vw;
          background-color:white;
        }
        .verifytext{
          font-size: 5vw;
        }
      }
    `
    const [sent, setSent] = useState()
    const [value, setValue] = useState()
    function sendCode(e){
        e.preventDefault()
        setValue(e.target.elements.searchTerm.value)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendforgot`,{email:e.target.elements.searchTerm.value})
        .then((res)=>{
            setSent(true)
        })
    }
    function handleChange(event){
        let valuee = event.target.value;
    
        // Remove non-numeric and non-decimal characters
        valuee = valuee.replace(/[^0-9.]/g, '');       
        // Remove decimal points
        // Limit the number of digits to 6
        valuee = valuee.slice(0, 6);
        valuee = valuee.replace(/(\.*)\./g, '$1');        
        // Update the input value
        event.target.value = valuee;
    }

    function verifyCode(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifyforgot`,{email:value,newpassword:e.target.elements.newpassword.value,code:e.target.elements.searchTerm.value})
        .then((res)=>{
            alert("Password has changed if the code is correct.")
            login()
        })
    }

    function login(){
        window.location.href = "/login"
    }
    return(
        <div className='box'>
            <style>
                {css}
            </style>
            <p className="t1">Enter Your Account's Email Address</p>
            <p className="t2">(Verification will be done using phone number)</p>
            <p className="t3">*sms rates may apply</p>
            <form onSubmit={sendCode}>
                <input disabled={sent} className = "searchTerm" id="searchTerm" type="email" title="searchTerm" placeholder="example@example.com"  required/><br />
                <button disabled={sent} className='send' type="submit"> <span className='sendtext'>Send Code</span></button>
            </form>
            <div>
                
                <form onSubmit={verifyCode}>
                    <h2 className="searchTermtext">Enter The Code You Received</h2>
                    <input className = "searchTerm" id="searchTerm"  onInput={handleChange} type="number" title="searchTerm" placeholder="123456"  required/><br />
                    <h2 className="passwordtext">And the new Password</h2>
                    <input className = "newpassword" id="newpassword"  type="password" title="newpassword" placeholder="Password"  required/><br />
                    <button type="submit" className='verify'><span className='verifytext'>Reset Password</span></button>
                </form>
            </div>
        </div>
    )
}
export default Forgot;