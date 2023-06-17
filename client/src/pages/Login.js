import axios from 'axios'
import { useEffect } from 'react';
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
function Login(){
    const signIn = useSignIn()
    const isAuthenticated = useIsAuthenticated()
    if(isAuthenticated()){
        window.location.href = "/"
    }
    const Submit = (e) => {
        e.preventDefault()
        axios({
            method:"POST",
            url:"https://backend-kn3o.onrender.com/login",
            data:{
                username:e.target.elements.username.value,
                password:e.target.elements.password.value
            },
        }).then((response=>{
            if(response.data==="DNE"){
                alert("This username doesn't exist, create an account if you don't have one");
            }
            else if(response.data==="wrong"){
                alert("The password does not match the username");
            }
            else{
                signIn({token:response.data,authState:{username:e.target.elements.username.value},expiresIn:43200})
                window.location.href = "/"
            }
        }))
    }
    const css = `
    
  body {
    font-size: 16px;
    background: rgba(86,31,157,1);
  }
  .box {
    width: 30rem;
    height: 25rem;
    background: rgba(224,223,223,1);
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-top-left-radius: 27px;
    border-top-right-radius: 27px;
    border-bottom-left-radius: 27px;
    border-bottom-right-radius: 27px;
    overflow: hidden;
  }
  .logintext {
    width:100%;
    color: rgba(0,0,0,1);
    position: absolute;
    font-family: DM Sans;
    font-weight: Regular;
    font-size: 7rem;
    opacity: 1;
    text-align: center;
  }
  .loginbutton {
    width: 90%;
    height: 10%;
    position: absolute;
    top: 85%;
    left: 5%;
    border-top-left-radius: 50vw;
    border-top-right-radius: 50vw;
    border-bottom-left-radius: 50vw;
    border-bottom-right-radius: 50vw;
    border: 0;
    background-color: rgba(86,31,157,1);
    
    overflow: hidden;
  }
  .loginbutton:hover{
    opacity: 0.8;
  }
  .loginbuttontext{
    color: white;
    font-size: 2rem;
  }
  .username{
    position: absolute;
    width: 90%;
    height: 10%;
    top: 40%;
    left: 5%;
    font-size: 1.75rem;
    padding-left: 1%;
    padding-top: .5%;
  }
  .email{
    position: absolute;
    width: 90%;
    height: 10%;
    top: 40%;
    left: 5%;
    font-size: 1.75rem;
    padding-left: 1%;
    padding-top: .5%;
  }
  .password{
    position: absolute;
    width: 90%;
    height: 10%;
    top: 55%;
    left: 5%;
    font-size: 1.75rem;
    padding-left: 1%;
    padding-top: .5%;
    font-family: Geologica;
    font-weight: Regular;
    padding-bottom: 0%;
  }
  .forgot{
    position: absolute;
    top: 75%;
    left: 5%;
    font-size: 1.5rem;
    font-family: Geologica;
  }
  .login{
    position: absolute;
    top: 75%;
    left: 5%;
    font-size: 1.5rem;
    font-family: Geologica;
  }
  .register{
    position: absolute;
    top: 75%;
    right: 5%;
    font-size: 1.5rem;
    font-family: Geologica;
  }
    `
    return(
        <div className='loginpage'>
            <style>
                {css}
            </style>
            <div className="box">
                <span className="logintext">LOGIN</span>
                <div className="loginform">
                    <form onSubmit={Submit}>
                        <input className = "username" id="username"type="text" title="username" placeholder="Username"  required/><br />
                        <input className = "password" id="password"type="password" title="password" placeholder="Password" required/><br />
                        <div className='linkcontainer'>
                            <a className='forgot' href='/forgot'>Forgot Password</a>
                            <a className='register' href='/register'>Create An Account</a>
                        </div>
                        <button type='submit' className="loginbutton"><label className='loginbuttontext'>Login</label></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;