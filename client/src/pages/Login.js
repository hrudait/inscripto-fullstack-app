
import {auth} from './firebase'
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from "../images/logo.svg"

function Login(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        window.location.href ='/'
      }
    })
    const Submit = (e) => {
        e.preventDefault()
        setPersistence(auth,browserLocalPersistence)
        signInWithEmailAndPassword(auth,e.target.elements.email.value,e.target.elements.password.value)
        .then(()=>{
          window.location.href='/'
        })
        .catch((error)=>{
          alert("Email or Password Incorrect")
        })
    }
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
  .full-page-container{
      background-color: #3D3D3E;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
  }
  img{
      width: 30vw;
      display: block;
      margin: 5vw auto 1vw;
  }
  h2{
      font-family: 'Chakra Petch';
      font-size: 2rem;
      color: white;
      text-align: center;
      margin-bottom: 2vw;
  }
  .items-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
  }
  input{
      width: 100%;
      border: .25vw solid #EDEEC9;
      border-radius: .75vw;
      font-family: 'Sen';
      padding-left: .75vw;
      height: 4vw;
      font-size: 2rem;
      margin-left: auto;
      margin-right: auto;
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
      display: block;
      text-align: left;
      margin: 0;
      padding: 0;
      font-family: 'Chakra Petch';
      font-size: 1.5rem;
      color: #FBFCF4;
      padding: .5vw;
      margin-top: 1vw;
  }
  .register{
      color: #3AAEBE;
      font-family: Sen;
      font-weight: 700;
      font-size: 1.5rem;
      padding-left: .5vw;
      padding-right: 2vw;
      text-decoration: none;
  }
  .underline {
      text-decoration: underline;
      font-weight: 800;
  }
  .forgot{
      color: #3AAEBE;
      font-family: Sen;
      font-weight: 700;
      font-size: 1.5rem;
      padding-right: .5vw;
      padding-left: 2vw;
  }
  .link-container{
      margin-top: 1vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .login{
      font-family: 'Chakra Petch';
      font-size: 2.25rem;
      background-color: #796EE8;
      color: white;
      margin: 0 auto 5vw;
      text-align: center;
      margin-top: 2vw;
      padding: .5vw 1vw;
      border: black solid .25vw;
      border-radius: 1vw;
      filter: drop-shadow(-1.5vw 3vw 3vw rgba(0, 0, 0, .25));
  }
  .button-container{
      justify-content: center;
      align-items: center;
      width: 100%;
      display: flex;
  }
  a:hover, button:hover{
      opacity: .8;
  }
  @media (max-width: 1300px) and (orientation: landscape) {
      input{
          height: 5vw;
      }
    }
  @media (orientation:portrait){
      img{
          width: 75vw;
      }
      input{
          height: 12.5vw;
          width: 80vw;
          border-radius: 1.5vw;
          padding-left: 3vw;
          font-size: 3.5rem
      }
      h2{
          font-size: 2.5rem;
      }
      .input-label{
          font-size: 2rem;
          margin-top: 5vw;
      }
      .link-container{
          margin-top: 3.5vw;
      }
      .forgot, .register{
          font-size: 2.25rem;
          color: #89CED8;
      }
      .forgot{
          padding-left: 0;
          margin-left: 0;
      }
      .register{
          padding-right: 0;
          margin-right: 0;
      }
      .button-container{
          margin-top: 8vw;
      }
      .login{
          font-size: 4rem;
          padding: 2vw 5vw;
          border: black solid .75vw;
          border-radius: 3vw;
          filter: drop-shadow(-1vw 1.5vw 1.5vw rgba(0, 0, 0, .25));
      }
  }
  
    `
    return(
      <div className='loginpage'>
            <style>
                {css}
            </style>
            <div className="full-page-container">
              <div className="items-container">
                  <img src={Logo}/>
                  <h2>Scrape verified local business emails today! </h2>
                  <form onSubmit={Submit}>
                      <span className="input-label">Email</span>
                      <input placeholder="enter email" type="email" title='email' className="email" id="email"/>
                      <span className="input-label">Password</span>
                      <input placeholder="enter password" title="password" type="password" className="password" id="password"/>
                      <div className="link-container">
                          <a className="register" href="/register"> No Account? <span className="underline">Register.</span></a>
                          <a className="forgot" href="/forgot">Forgot Password?</a>
                      </div>
                      <div className="button-container">
                          <button className="login" type="submit">log in</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
}
export default Login;