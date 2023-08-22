import { useSignOut } from "react-auth-kit";

function DNE(){
    function home(){
        window.location.href = '/'
    }
    const css = `body{
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
    
    .signedOut{   
        color: white;
        margin: 0;
        text-align: center;
        font-size: 3vw;
        font-family: 'Open Sans';
        font-weight: 400;
        margin-bottom: 10vw;
        margin-left: 2.5vw;
        margin-right: 2.5vw;
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
        color: black;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 3vw;
      }
      .return:hover{
        opacity: 0.8;
      }
      @media (orientation: portrait){
        .signedOut{
          font-size: 10vw;
          width: 100vw;
        }
        .return{
          width: 75vw;
          height: 10vw;
          background-color:white;
        }
        .returnText{
          font-size: 5vw;
        }
      }
    `
    return(
        <div>
            <style>
                {css}
            </style>
            <div className="box">
                <h1 className="signedOut">This page does not exist.</h1>
                <button className = 'return' onClick={home}><span className="returnText">return to home</span></button>
            </div>
        </div>
    )
}
export default DNE;