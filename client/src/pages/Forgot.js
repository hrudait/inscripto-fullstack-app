import { useState, useEffect } from "react"
import axios from 'axios'
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import logo from '../images/logo.svg'
import leftarrow from '../images/larrow.svg'
function Forgot(){
    
    const css = `
    *{
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
  }
  body{
      background-color: #3D3D3E;
  }
  .header{
      width: 100vw;
      display: flex;
      justify-content: space-between;
  
  }
  img{
      width: 20vw;
      padding-left: 2vw;
      padding-top: 2vw;
  }
  nav{
      padding-right: 3vw;

      padding-top: 2vw;
  }
  a{
      color: white;
      text-decoration: none;
      font-family: 'Chakra Petch';
      font-size: 2rem;
  }
  
  .reset-href{
      color: #89CED8;
      text-decoration: underline;
  }
  
  .register-href, .reset-href{
      padding-left: 2vw;
  }
  
  .full-page-container{
      display: flex;
      align-items: center;
      justify-content: center;
  }
  input{
      width: 30vw;
      border: .25vw solid #EDEEC9;
      border-radius: .75vw;
      font-family: 'Sen';
      padding-left: .75vw;
      height: 4vw;
      font-size: 2rem;
      background-color: white;
  }
  input::placeholder{
      color: #B1B1B2;
  }
  input:focus{
      border-color:#574AE2 ;
      background-color: #DDDBF9;
      outline: none;
  }
  .input-label{
      text-align: left;
      margin: 0;
      padding: 0;
      font-family: 'Chakra Petch';
      font-size: 1.5rem;
      color: #FBFCF4;
      margin-left:.5vw;

  }
  .register{
      display:inline;
      font-family: 'Chakra Petch';
      font-size: 2.25rem;
      background-color: #796EE8;
      color: white;
      margin: 0;
      margin-top:1.75rem;
      margin-left:2vw;
      text-align: center;
      padding: .5vw 1vw;
      border: black solid .25vw;
      border-radius: 1vw;
      filter: drop-shadow(-1.5vw 3vw 3vw rgba(0, 0, 0, .25));
  }
  .button-container{
      display:flex;
      justify-content:center;
      margin-top:5vw;
  }
  .input-container{
    display:inline;
  }
  button:hover{
      opacity: .8;
  }
  .already{
      display: none;
  }
  .mobile-header{
      display: none;
  }
  .please{
    display:block;
    margin-top:5vw;
    text-align:center;
    color:white;
    font-family:'Sen';
    font-weight:700;
    font-size:2rem;
  }
  .reset{
    display:block;
    margin-top:1vw;
    text-align:center;
    color:white;
    font-family:'Sen';
    font-weight:400;
    font-size:1.25rem;
  }
  form{
    display:flex;
    flex-direction:column;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2vw;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 1vw; /* Add some spacing between label and input */
}

  
  @media (max-width: 1300px) and (orientation: landscape) {
      input{
          height: 5vw;
      }
    }
  @media (orientation:portrait){
      .header{
          display: none;
      }
      .mobile-header{
          display: flex;
          justify-content: space-between;
      }
      .register-text{
          font-family: 'Chakra Petch';
          font-size: 4rem;
          padding: 5vw;
          color: #BCB7F3;
          displaY:inline;
          white-space:nowrap;
          margin:0;
          padding:0;
          text-decoration:underline;
      }
      img{
          width: 40vw;
          box-sizing: content-box;
          padding: 5vw;
      }
      input{
          height: 12.5vw;
          width: 80vw;
          border-radius: 1.5vw;
          padding-left: 3vw;
          font-size: 3.5rem;
      }
      .input-label {
          font-size: 2rem;
          margin-top: 5vw;
          margin-bottom: 1vw;
      }
      .top{
          margin-top: 3vw;
      }
      .already{
          display: block;
          font-family: "Sen";
          font-weight: 500;
          color: #89CED8;
          padding: .5vw;
          margin-top: 25vw;
      }
      .underline {
          text-decoration: underline;
          font-weight: 800;
      }
      .register {
          margin-top: 10vw;
          font-size: 4rem;
          padding: 2vw 5vw;
          border: black solid 0.75vw;
          border-radius: 3vw;
          filter: drop-shadow(-1vw 1.5vw 1.5vw rgba(0, 0, 0, .25));
      }
      .please{
        margin-top:15vw;
        font-size:3rem;
        text-align:center;
        width:90vw;
        margin:15vw auto 5vw;
      }
      .reset{
        font-size:2rem;
      }
      .leftarrow{
        height:5vw;
        displaY:inline;
        width:5vw;
        box-sizing:content-box;
        padding:0;
        margin:0;
      }
      .ok{
        display:flex;
        justify-content:left;
        align-items:center;
        margin-bottom:3vw;
      }
      .form-container {
        align-items: center;
    }
    
    .input-container {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2vw;
    }
    
    .input-wrapper {
        align-items: center;
        margin-right: 0;
        margin-bottom: 2vw;
    }
    .input-label {
      text-align: left; /* Align the label text to the left */
      align-self: flex-start; /* Align the label to the left */
      padding-left:1vw;
  }
  
    .register {
        margin-top: 1vw;
    }
  }
    `
  function reset(e){
    const auth = getAuth()
    sendPasswordResetEmail(auth,e.target.elements.email.value)
    .then(()=>{
      window.location.href ='/resetSent'
    })
    .catch((error)=>{
      console.log("error")
      alert("Email failed, try again")
    })
  }

    return(
        <div className='registerpage'>
            <style>
                {css}
            </style>
            <div className="header">
                <img src={logo}/>
                <nav>
                    <a href="/login" className="login-href">Login</a>
                    <a href="/register" className="register-href">Register</a>
                    <a href="/forgot" className="reset-href">Reset Password</a>
                </nav>
            </div>
            <div className="mobile-header">
              <div className="ok">
                <img src={leftarrow} className="leftarrow"/>
                <a href="/login" className="register-text">back to login</a>
              </div>
                <img src={logo} />
            </div>
            <div className="full-page-container">
              <form onSubmit={reset} className="form-container">
                  <span className="please">Please enter the Email Address you used to register.</span>
                  <span className="reset">You will receive an email with a reset link.</span>
                  
                  <div className="input-container">
                      <div className="input-wrapper">
                          <span className="input-label">Email</span>
                          <input placeholder="enter email" type="email" className="email" id="email"/>
                      </div>
                      <button className="register" type="submit">enter</button>
                  </div>
              </form>
          </div>
        </div>

    )
}
export default Forgot;