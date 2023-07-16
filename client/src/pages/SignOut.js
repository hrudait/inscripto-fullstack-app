import { useSignOut } from "react-auth-kit";

function SignOut(){
    const signOut = useSignOut()
    signOut()
    function login(){
        window.location.href = '/login'
    }
    const css = `body{
        background-color: #363636;
      }
    .box{
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    
        align-items: center;
    }
    
    .signedOut{   
        color: white;
        margin: 0;
        text-align: center;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin-bottom: 10vw;
        margin-left: 2vw;
        margin-right: 2vw;
      }
    
      .return {
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
      .returnText{
        color: #363636;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 3vw;
      }
      .return:hover{
        opacity: 0.8;
      }
    `
    return(
        <div>
            <style>
                {css}
            </style>
            <div className="box">
               <h1 className="signedOut">You have been signed out.</h1>
                <button className = 'return' onClick={login}><span className="returnText">return to login</span></button>
            </div>
        </div>
    )
}
export default SignOut;