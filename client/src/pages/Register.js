import axios from 'axios'
import {useIsAuthenticated} from 'react-auth-kit'
function Register(){
    const isAuthenticated = useIsAuthenticated()
    if(isAuthenticated()){
        window.location.href = "/"
    }
    function submit(e) {
        e.preventDefault()
        axios({
            method:"POST",
            url:"http://localhost:5000/register",
            data:{
                username:e.target.elements.username.value,
                email:e.target.elements.email.value,
                password:e.target.elements.password.value
            },
        }).then((response=>{
            console.log(response)
            if(response.data==="Email already in use"){
                alert(response.data);
            }
            else if(response.data==="Choose a different username"){
                alert(response.data)
            }
            else{
                window.location.href = response.data
            }
        }))
    }
    return(
        <div className="log-form">
            <h2>Create your account</h2>
            <form onSubmit={submit}>
                <input id = "username" type="text" title="username" placeholder="username"  required /> <br />
                <input id = "email" type="email" title="email" placeholder="email"  required/><br />
                <input id = "password" type="password" title="password" placeholder="password" required/><br />
                <button type="submit" className="btn">Register</button><br />
            </form>
        </div>
    )
}
export default Register;