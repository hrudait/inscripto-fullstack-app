import logo from '../images/logo.svg'

function DNE(){

    const css = `
        body{
            background-color: #3D3D3E;
            overflow-x:hidden;
        }
        .container{
            width:100vw;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
        }
        img{
            display:block;
            padding:1vw;
        }
        span{
            display:block;
            color:white;
            font-family:'Sen';
            font-weight:400;
            font-size:3rem;
            margin-top:15vw;
            margin-bottom:5vw;
        }
        button{
            margin:0;
            font-family: 'Chakra Petch';
            font-size: 2rem;
            padding: .5vw 1vw;
            background-color: #796EE8 ;
            color: white;
            border: black solid .175vw;
            border-radius: .75vw;

            cursor:pointer;
        }
        @media (orientation:portrait){
            .image{
                display:flex;
                justify-content:right;
                width:100vw;
            }
            img{
                padding: 2vw;
            }
            span{
                font-size:5rem;
                margin-top:40vw;
                margin-bottom:10vw;
                width:90vw;
                text-align:center;
            }
            button{
              font-family:'Sen';
              padding: 2vw 3vw;
              font-size:5rem;
              width:80vw;
              border-width:.5vw;
              border-radius: 2vw;
            }
        }
    `

    return(
        <div>
            <style>
                {css}
            </style>
            <div className='image'> 
            <img src={logo}/></div>
            <div className='container'>
                <span>This page does not exist.</span>
                <button onClick={()=>window.location.href="/"}>return to home</button>
            </div>
        </div>
    )
}
export default DNE;