import axios from 'axios'
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";

import PhoneInput from 'react-phone-number-input'
import { auth } from './firebase';
function Verify(){
    //check auth
    auth.onAuthStateChanged((user)=>{
        if(!user){
          window.location.href ='/login'
        }
      })

    const css = `
    :root {
        --PhoneInput-color--focus: #03b2cb;
        --PhoneInputInternationalIconPhone-opacity: 0.8;
        --PhoneInputInternationalIconGlobe-opacity: 0.65;
        --PhoneInputCountrySelect-marginRight: 0.35em;
        --PhoneInputCountrySelectArrow-width: 1vw;
        --PhoneInputCountrySelectArrow-marginLeft: var(--PhoneInputCountrySelect-marginRight);
        --PhoneInputCountrySelectArrow-borderWidth: 1px;
        --PhoneInputCountrySelectArrow-opacity: 0.45;
        --PhoneInputCountrySelectArrow-color: currentColor;
        --PhoneInputCountrySelectArrow-color--focus: var(--PhoneInput-color--focus);
        --PhoneInputCountrySelectArrow-transform: rotate(45deg);
        --PhoneInputCountryFlag-aspectRatio: 1.5;
        --PhoneInputCountryFlag-height: 5vw;
        --PhoneInputCountryFlag-borderWidth: 1px;
        --PhoneInputCountryFlag-borderColor: rgba(0,0,0,0.5);
        --PhoneInputCountryFlag-borderColor--focus: var(--PhoneInput-color--focus);
        --PhoneInputCountryFlag-backgroundColor--loading: rgba(0,0,0,0.1);
    }
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
    .PhoneInput {
        display: flex;
        align-items: center;
        color:white;
    }
    
    .PhoneInputInput {
        width:20.5vw;
        height:5vw;
        box-sizing: border-box;
        background-color: black;
        color: white;
        border: .25vw solid white;
        border-radius: .75vw;
        font-size: 1.66vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin: 0;
        padding-left:2.5%;
        outline-color: white;
    }
    
    .PhoneInputCountryIcon {
        width: calc(var(--PhoneInputCountryFlag-height) * var(--PhoneInputCountryFlag-aspectRatio));
        height: var(--PhoneInputCountryFlag-height);
        outline: .05vw solid white;
    }
    
    .PhoneInputCountryIcon--square {
        width: var(--PhoneInputCountryFlag-height);
    }
    
    .PhoneInputCountryIcon--border {
        
        
        background-color: var(--PhoneInputCountryFlag-backgroundColor--loading);
        
        box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth) var(--PhoneInputCountryFlag-borderColor),
            inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth) var(--PhoneInputCountryFlag-borderColor);
    }
    
    .PhoneInputCountryIconImg {
        
        display: block;
        
        width: 100%;
        height: 100%;
    }
    
    .PhoneInputInternationalIconPhone {
        opacity: var(--PhoneInputInternationalIconPhone-opacity);
    }
    
    .PhoneInputInternationalIconGlobe {
        opacity: var(--PhoneInputInternationalIconGlobe-opacity);
    }
    
    
    
    .PhoneInputCountry {
        position: relative;
        align-self: stretch;
        display: flex;
        align-items: center;
        margin-right: var(--PhoneInputCountrySelect-marginRight);
    }
    
    .PhoneInputCountrySelect {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        border: 0;
        opacity: 0;
        cursor: pointer;
    }
    
    .PhoneInputCountrySelect[disabled],
    .PhoneInputCountrySelect[readonly] {
        cursor: default;
    }
    
    .PhoneInputCountrySelectArrow {
        display: block;
        content: '';
        width: var(--PhoneInputCountrySelectArrow-width);
        height: var(--PhoneInputCountrySelectArrow-width);
        margin-left: var(--PhoneInputCountrySelectArrow-marginLeft);
        border-style: solid;
        border-color: var(--PhoneInputCountrySelectArrow-color);
        border-top-width: 0;
        border-bottom-width: var(--PhoneInputCountrySelectArrow-borderWidth);
        border-left-width: 0;
        border-right-width: var(--PhoneInputCountrySelectArrow-borderWidth);
        transform: var(--PhoneInputCountrySelectArrow-transform);
        opacity: var(--PhoneInputCountrySelectArrow-opacity);
    }
    
    .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon + .PhoneInputCountrySelectArrow {
        opacity: 1;
        color: var(--PhoneInputCountrySelectArrow-color--focus);
    }
    
    .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {
        box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth) var(--PhoneInputCountryFlag-borderColor--focus),
            inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth) var(--PhoneInputCountryFlag-borderColor--focus);
    }
    
    .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon .PhoneInputInternationalIconGlobe {
        opacity: 1;
        color: var(--PhoneInputCountrySelectArrow-color--focus);
    }
    .phonetext{
        color:white;
        font-family:'Open Sans';
        font-weight:400;
        font-size:1.5vw;
    }
    .send {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60%;
        margin: 0 auto;
        margin-top: 2vw;
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
        width: 30%;
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
      @media (orientation: portrait) {
        .phonetext{
            font-size: 6vw;
            width: 90vw;
        }
        .bruh{
            font-size: 3vw;
        }
        .send{
            height: 10vw;
            width: 70vw;
            margin-top: 5vw;
            background-color: white;
        }
        .sendtext{
            font-size: 5vw;
        }
        .PhoneInput {
            display: flex;
            align-items: center;
            color:white;
        }
        
        .PhoneInputInput {
            width:70vw;
            height:10vw;
            box-sizing: border-box;
            background-color: black;
            color: white;
            border: .25vw solid white;
            border-radius: .75vw;
            font-size: 5vw;
            font-family: 'Open Sans';
            font-weight: 400;
            margin: 0;
            padding-left:2.5%;
            outline-color: white;
        }
        
        .PhoneInputCountryIcon {
            width: calc(10vw * var(--PhoneInputCountryFlag-aspectRatio));
            height: 10vw;
            outline: .05vw solid white;
        }
        .searchTermtext{
            font-size:6vw;
            margin-top: 5vw;
        }
        .searchTerm{
            height: 10vw;
            width: 50vw;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: .5vw;
            font-size: 5vw;
        }
        .verify{
            width: 30vw;
            height: 10vw;
            margin-top: 2vw;
            background-color:white;
        }
        .verifytext{
            font-size: 5vw;
        }
      }
    `

    function sendCode(){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendverify`,{email:auth.currentUser.email,phone:value})
        .then((res)=>{
            if(res.data==="sent"){
                setSent(true)
            }
            else if(res.data==="al"){
                alert("That Number is already in use")
            }
            else{
                alert("Try again or use a different number")
            }  
        })
    }
    function verifyCode(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifycode`,{email:auth.currentUser.email,phone:value,code:e.target.elements.searchTerm.value})
        .then((res)=>{
            if(res.data==="verified"){
                window.location.href="/"
            }
            else{
                alert("code invalid")
            }
        })
    }
    function CodeBox(){
        if(!sent){
            return(<div></div>)
        }
        return(<div>
            <h2 className="searchTermtext">Enter The Code You Received</h2>
            <form onSubmit={verifyCode}>
                <input class = "searchTerm" id="searchTerm" onInput={handleChange} type="number" title="searchTerm" placeholder="123456"  required/><br />
                <button type="submit" className='verify'><span className='verifytext'>Verify</span></button>
            </form>
            </div>
        )
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
    const [value, setValue] = useState()
    const [sent, setSent] = useState()
    return (
        <div className='box'>
            <style>
                {css}
            </style>
            <h1 className='phonetext'>Enter Your Phone Number For Verification (Global Format) <br></br> <span className="bruh">(SMS rates may apply, numbers only used for verification)</span></h1>
            <PhoneInput disabled={sent}
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}/>
            <button disabled={sent} className='send' onClick={sendCode}><span className='sendtext'>Send Code</span></button>
            <CodeBox/>
        </div>
    )
}
export default Verify;