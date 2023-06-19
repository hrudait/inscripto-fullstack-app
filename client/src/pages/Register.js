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
            url:`${process.env.REACT_APP_BACKEND_URL}/register`,
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
    const css = `
    
body {
    font-size: 16px;
    background: rgba(86,133,157,1);
  }
.box {
  width: 30rem;
  height: 32.5rem;
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
.registertext {
  width:100%;
  color: rgba(0,0,0,1);
  position: absolute;
  font-family: DM Sans;
  font-weight: Regular;
  font-size: 7rem;
  opacity: 1;
  text-align: center;
}
.registerbutton {
  width: 90%;
  height: 10%;
  position: absolute;
  top: 87.5%;
  left: 5%;
  border-top-left-radius: 50vw;
  border-top-right-radius: 50vw;
  border-bottom-left-radius: 50vw;
  border-bottom-right-radius: 50vw;
  border: 0;
  background-color: rgba(86,31,157,1);
  
  overflow: hidden;
}
.registerbutton:hover{
  opacity: 0.8;
}
.registerbuttontext{
  color: white;
  font-size: 2rem;
}
.username{
  position: absolute;
  width: 90%;
  height: 4rem;
  top: 10rem;
  left: 5%;
  font-size: 1.75rem;
  padding-left: 1%;
  padding-top: .5%;
}
.email{
  position: absolute;
  width: 90%;
  height: 4rem;
  top: 15rem;
  left: 5%;
  font-size: 1.75rem;
  padding-left: 1%;
  padding-top: .5%;
}
.password{
  position: absolute;
  width: 90%;
  height: 4rem;
  top: 20rem;
  left: 5%;
  font-size: 1.75rem;
  padding-left: 1%;
  padding-top: .5%;
  font-family: Geologica;
  font-weight: Regular;
  padding-bottom: 0%;
}
.login{
  position: absolute;
  top: 77.5%;
  left: 5%;
  font-size: 1.5rem;
  font-family: Geologica;
}
    `
    return(
        <div className='registerpage'>
            <style>
                {css}
            </style>
            <div className="box">
                <span className="registertext">Register</span>
                <div className="registerform">
                    <form onSubmit={submit}>
                        <input className = "username" id="username"type="text" title="username" placeholder="Username"  required/><br />
                        <input className = "email" id="email"type="email" title="email" placeholder="Email"  required/><br />
                        <input className = "password" id="password"type="password" title="password" placeholder="Password" required/><br />
                        <div className='linkcontainer'>
                            <a className='login' href='/login'>Login</a>
                        </div>
                        <button type='submit' className="registerbutton"><label className='registerbuttontext'>Register</label></button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Register;