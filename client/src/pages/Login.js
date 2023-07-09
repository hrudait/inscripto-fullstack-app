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
            url:`${process.env.REACT_APP_BACKEND_URL}/login`,
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
.welcome{   
  color: white;
  margin: 0;
  text-align: center;
  font-size: 3vw;
  font-family: 'Open Sans';
  font-weight: 400;
  margin-bottom: 2vw;
  margin-left: 8vw;
  margin-right: 8vw;
}
.username{
  background-color: black;
  color: white;
  border: .25vw solid white;
  border-radius: .75vw;
  width: 97.5%;
  height: 5vw;
  font-size: 1.66vw;
  font-family: 'Open Sans';
  font-weight: 400;
  margin: 0;
  padding: 0;
  padding-left: 2.5%;
  margin-bottom: 1vw;
  outline-color: white;
  
}
.password{
  background-color: black;
  color: white;
  border: .25vw solid white;
  border-radius: .75vw;
  width: 97.5%;
  height: 5vw;
  font-size: 1.66vw;
  font-family: 'Open Sans';
  font-weight: 400;
  margin: 0;
  padding: 0;
  outline-color: white;
  padding-left: 2.5%;
}
.linkcontainer{
  margin-left: 1px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1vw;
}
.forgot{
  color: white;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 1.66vw;
}
.register{
  color: white;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 1.66vw;
}
.loginbutton {
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
.loginbuttontext{
  color: black;
  font-family: 'Open Sans';
  font-weight: 400;
  font-size: 3vw;
}
.loginbutton:hover{
  opacity: 0.8;
}
    `
    return(
      <div className='loginpage'>
            <style>
                {css}
            </style>
        <div className="box">
            <h1 className="welcome">Welcome Back!</h1>
            <div className="loginform">
                <form onSubmit={Submit}>
                    <input className = "username" id="username"type="text" title="username" placeholder="Username"  required/><br />
                    <input className = "password" id="password"type="password" title="password" placeholder="Password" required/><br />
                    <div className='linkcontainer'>
                        <a className='forgot' href='/forgot'>Forgot Password</a>
                        <a className='register' href='/register'>Create An Account</a>
                    </div>
                    <button id = 'loginbutton' type='submit' className="loginbutton"><span className='loginbuttontext'>login</span></button>
                </form>
            </div>
        </div>
      </div>
    )
}
export default Login;