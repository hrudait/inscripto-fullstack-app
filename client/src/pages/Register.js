import axios from 'axios'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './firebase'
import logo from "../images/logo.svg"
function Register(){
    auth.onAuthStateChanged((user)=>{
        if(user){
          window.location.href ='/'
        }
      })
    async function submit(e) {
        e.preventDefault()
        if(e.target.elements.password.value===e.target.elements.repeatpassword.value){
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createUser`,{email:e.target.elements.email.value,username:e.target.elements.username.value})
          console.log("bruh")
          createUserWithEmailAndPassword(auth, e.target.elements.email.value,e.target.elements.password.value)
          .catch((error)=>{
            alert("Error with email or password, try again")
          })
        }
        else{
          alert("Passwords do not match")
        }
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
  
  .register-href{
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
      font-family: 'Chakra Petch';
      font-size: 2.25rem;
      background-color: #796EE8;
      color: white;
      margin: 0 auto 5vw;
      text-align: center;
      margin-top: 3vw;
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
  button:hover{
      opacity: .8;
  }
  .already{
      display: none;
  }
  .mobile-header{
      display: none;
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
  }
    `
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
                <a href="/register" className="register-text">Register</a>
                <img src={logo} />
            </div>
            <div className="full-page-container">
                <form onSubmit={submit}>
                    <a className="already" href="/login">Already have an account? <span className="underline">Login.</span></a>
                    <span className="input-label top">Username</span>
                    <input placeholder="enter username" type="text" className="username" id="username"/>
                    <span className="input-label">Email</span>
                    <input placeholder="enter email" type="email" className="email" id="email"/>
                    <span className="input-label">Password</span>
                    <input placeholder="enter password" type="password" className="password" id="password"/>
                    <span className="input-label">Repeat Password</span>
                    <input placeholder="repeat password" type="password" className="repeatpassword" id="repeatpassword"/>
                    <div className="button-container">
                        <button className="register" type="submit">register</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default Register;