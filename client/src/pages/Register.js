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
    .registertext{   
      color: white;
      margin: 0;
      text-align: center;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin-bottom: 2vw;
      margin-left: 6vw;
      margin-right: 6vw;
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
    .email{
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
      justify-content: center;
      margin-top: 1vw;
    }
    .login{
      color: white;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 1.66vw;
    }
    .registerbutton {
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
    .registerbuttontext{
      color: black;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 3vw;
    }
    .registerbutton:hover{
      opacity: 0.8;
    }
    `
    return(
        <div className='registerpage'>
            <style>
                {css}
            </style>
            <div className="box">
              <h1 className="registertext">Create An Account</h1>
              <div className="registerform">
                  <form onSubmit={submit}>
                      <input className = "username" id="username"type="text" title="username" placeholder="Username"  required/><br />
                      <input className = "email" id="email"type="email" title="email" placeholder="Email"  required/><br />
                      <input className = "password" id="password"type="password" title="password" placeholder="Password" required/><br />
                      <div className="linkcontainer">
                          <a className='login' href='/login'>Already have an Account?</a>
                      </div>
                      <button type='submit' className="registerbutton"><span className='registerbuttontext'>register</span></button>
                  </form>
              </div>
          </div>
        </div>

    )
}
export default Register;