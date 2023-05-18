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
    return(
        <div className="log-form">
            <h2>Sign In</h2>
            <form onSubmit={Submit}>
                <input id = "username" type="text" title="username" placeholder="username"  required/><br />
                <input id = "password" type="password" title="password" placeholder="password" required/><br />
                <button type="submit" className="btn">Login</button><br />
            </form>
        </div> 
    )
}
export default Login;