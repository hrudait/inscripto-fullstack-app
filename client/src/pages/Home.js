import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import logo from './logo.svg'
import menu from './hamburger.svg'
import close from './close.svg'

function Home(){
    const [credits, setcredits] = useState();
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1)
    const [currentData, setcurrent] = useState();
    const [finishedData, setfinished] = useState();
    const authHeader = useAuthHeader()
    const authUser = useAuthUser()
    const user = authUser()
    //check auth
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth`,{headers:{"authorization":authHeader().substring(10)}})
        .then((res)=>{
            if(!(res.data===authUser().username)){
              if(res.data==="verify"){
                window.location.href = "/verify" 
              }
              else{
                window.location.href = "/signout" 
              }
            }
        })
        .catch((e)=>{            
            window.location.href = "/signout"           
        })
    },[])

    //get the user credits
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getUser`,{username:user.username})
        .then((res)=>{
            setcredits(res.data.credits)
        })
        getCurrent()
        getFinished()
    },[])


    function submite(e){
      console.log(e)
        if(credits===0){
            alert("Not enough credits, please reload")
        }
        else{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/getCurrentCsvAmount`)
            .then((res)=>{
                if(parseInt(res.data,10)>=5){
                    alert('Too many requests')
                    return
                }
            })
            
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/run`,{username:user.username,searchTerm:e.target.elements.searchTerm.value,location:e.target.elements.location.value})
            .then(()=>{
                getCurrent()
                getFinished()
                e.target.reset();
            })
        }
    }

    function reload(){
        window.location.href = '/reload'
    }
    
    function getCurrent(){
      console.log("gc")
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/getCurrent`,{username:user.username})
      .then((res)=>{
          console.log(res.data)
          setcurrent(res.data)
      })
    }

    function getFinished(){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getFinished`,{username:user.username,page:page})
        .then((res)=>{
            console.log(res.data)
            const list = res.data
            setMaxPages(Math.floor((list.pop())/6)+1)
            console.log(list)
            setfinished(list)
        })
    }

    function CurrentCsvs(){
        console.log("eh")
        if(!currentData){
            return(<div></div>)
        }
        return(
            <div>
                {
                    currentData.map( csvitem => (
                        <div className = "currentitem" key={csvitem.id}>
                            <p className="currentsearchTerm">Search Term: {csvitem.name}</p>
                            <p className="currentlocation">Location: {csvitem.location}</p>
                        </div>
                    ))
                }
            </div>
        )
    }

    function incPage(){
        setPage(page+1)
    }

    useEffect(() => {
      getCurrent();
      getFinished();
    }, [page]);
    
    function decPage(){
        setPage(page-1)
    }

    function FinishedCsvs(){
        if(!finishedData){
            return(<div></div>)
        }
        const hideLeftA = (page===1)
        const hideRightA = (maxPages===page)
        return(
            <div>
                {
                    finishedData.map( csvitem => (
                        <div className="finisheditem" key={csvitem.id}>
                            <p className="finishedsearchTerm">Search Term: {csvitem.name}</p>
                            <p className="finishedlocation">Location: {csvitem.location}</p>
                            {csvitem.url === "failed" ? (
                            <p className="finisheddownlaod">Search Failed, Credit Refunded</p>
                        ) : (
                            <a className="finisheddownlaod" href={csvitem.url}>CSV Download</a>
                        )}
                        </div>
                    ))
                }
                <div className="pagechanger">
                {hideLeftA ? null : <span className="lefta" id="lefta" onClick={()=>decPage()}>&lt;</span>}
                <span className="pagenum">{page}</span>
                {hideRightA ? null : <span id="righta" className="righta" onClick={()=>incPage()}>&gt;</span>}
                    
                </div>
            </div>
        )
    }
    useEffect(() => {
      if (currentData) {
        const intervalone = setInterval(getCurrent, 30000);
        const intervaltwo = setInterval(getFinished, 30000);
  
        return () => {
          clearInterval(intervalone);
          clearInterval(intervaltwo);
        };
      }
    }, [currentData]);
    const [toggle,setToggle] = useState(true)
    function toggleMenu(){
      setToggle(!toggle)
    }
    const css = `
    .pagechanger{
        display: flex;
      justify-content: space-evenly;
      margin: 0;
    }
    .pagenum{
        color: white;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 1.66vw;
    }
    .righta{
        color: white;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 1.66vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .lefta{
        color: white;
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 1.66vw;
        margin-left: 1vw;
        margin-right: 1vw;
    }
    .lefta:hover{
        text-decoration: underline;
    }
    .righta:hover{
        text-decoration: underline;
    }
    body{
        background-color: black;
      }
    .logo{
      width: 20vw;
      margin: 0;
    }
    .desktopnavbar{
      display: flex;
      justify-content: space-evenly;
      margin: 0;
      margin-bottom: 2vw;
    }
    .navhome{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-right: 3.5vw;
    }
    .navhome:hover{
      opacity: 0.8;
    }
    .navreload{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-right: 3.5vw;
    }
    .navreload:hover{
      opacity: 0.8;
    }
    .navsignout{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-right: 4.5vw;
    }
    .navsignout:hover{
      opacity: 0.8;
    }
    .credits{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;  
    }
    .container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      
    }
    .startandnow{
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      align-items: center;
    }
    .finishedbox{
      
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      align-items: flex-start; /* Align items at the top */
    }
    .finished{
      
      margin: 0;
    }
    .start{
      
      margin-bottom: 5vw;
    }
    .starttext{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-left: 2.5vw;
      margin-right: 2.5vw;
      margin-bottom: 1vw;
    }
    .searchTermtext{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-right: 4.5vw;
    }
    .locationtext{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-right: 4.5vw;
    }
    .searchTerm{
      background-color: black;
      color: white;
      border: .25vw solid white;
      width: 100%;
      height: 3vw;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding: 0;
      padding-left: 2.5%;
      margin-bottom: 1vw;
      outline-color: white;
      box-sizing: border-box;
      
    }
    .location{
      background-color: black;
      color: white;
      border: .25vw solid white;
      width: 100%;
      height: 3vw;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding: 0;
      padding-left: 2.5%;
      margin-bottom: 1vw;
      outline-color: white;
      box-sizing: border-box;
      
    }
    .current{
      
    }
    .runningnow{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-left: .5vw;
      margin-right: .5vw;
      margin-bottom: 1vw;
    }
    .finishedtext{
      color: white;
      font-size: 3vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      margin-left: 8vw;
      margin-right: 8vw;
      margin-bottom: 1vw;
    }
    .startbutton {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40%;
      margin: 0 auto;
      height: 2vw;
      border: 0;
      border-radius: .5vw;
    }
    .startbuttontext{
      color: black;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 1.66vw;
    }
    .startbutton:hover{
      opacity: 0.8;
    }
    .currentitem{
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: .25vw solid white;
      border-radius: .5vw;
      margin-bottom: 1vw;
    }
    .currentsearchTerm{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding-left: .25vw;
    }
    .currentlocation{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding-left: .25vw;
    }
    .finisheditem{
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: .25vw solid white;
      border-radius: .5vw;
      margin-bottom: 1vw;
    }
    .finishedsearchTerm{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding-left: .25vw;
    }
    .finishedlocation{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      font-weight: 400;
      margin: 0;
      padding-left: .25vw;
    }
    .finisheddownlaod{
      color: white;
      font-size: 1vw;
      font-family: 'Open Sans';
      text-decoration: underlines;
      font-weight: 400;
      margin: 0;
      padding-left: .25vw;
    }
    .feedback{
      color:white;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 1vw;
      text-align:center;
      margin-top: 4vw;
    }
    .feedbackemail{
      color:white;
      font-family: 'Open Sans';
      font-weight: 400;
      font-size: 1vw;
      text-align:center;
    }
    .footer{
      
    }
    @media (orientation: landscape) {
      .mobilenavbar {
        display: none;
      }
    }
    @media (orientation: portrait) {
      .desktopnavbar {
        display: none; /* This will hide the element in portrait mode */
      }
      .menubox{
        display:flex;
        margin: 0;
      }
      .menu{
        width: 10vw;
      }
      .logo{
        margin-left:5vw;
        width: 70vw;
      }
      .credits{
        text-align: center;
        font-size: 7vw;
        margin:0;
      }
      .menunav{
        position:absolute;
        top:0;
        left:0;
        width:80vw;
        height:50vh;
        background-color:black;
      }
      .navhome{
        margin-left:5vw;
        font-size:10vw;
      }
      .navreload{
        margin-left:5vw;
        font-size:10vw;
      }
      .navsignout{
        margin-left:5vw;
        font-size:10vw;
      }
      .close{
        position:absolute;
        width:10vw;
        top:2vw;
        left:68vw;
      }
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .startandnow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* ... (other CSS rules) ... */
      }
      .starttext{
        font-size:10vw;
        margin:0;
        text-align: center;
        margin-bottom: 2vw;
      }
      .searchTermtext{
        font-size:5vw;
      }
      .searchTerm{
        font-size:3vw;
        height: 10vw;
      }
      .locationtext{
        font-size:5vw;
      }
      .location{
        font-size:3vw;
        height: 10vw;
      }
      .startbutton{
        margin-top:5vw;
        height:10vw;
        width: 50vw;
        background-color:white;
      }
      .startbuttontext{
        margin:0;
        font-size:5vw;
      }
      .runningnow{
        font-size: 8vw;
        text-align: center;
        margin:0;
      }
      .finishedtext{
        font-size: 8vw;
        text-align: center;
        margin:0;
      }
      .feedback{
        font-size:3vw;
      }
      .feedbackemail{
        font-size:3vw;
      }
      .pagenum{
        font-size:5vw;
      }
      .lefta{
        font-size:5vw;
      }
      .righta{
        font-size:5vw;
      }
      .finisheditem{
        width:80vw;
        height: 13vw;
        margin-top:2vw;
      }
      .currentitem{
        width:80vw;
        height: 15vw;
        margin-top:2vw;
      }
      .currentsearchTerm{
        font-size:5vw;
      }
      .currentlocation{
        font-size:5vw;
      }
      .finishedsearchTerm{
        font-size:3vw;
      }
      .finishedlocation{
        font-size:3vw;
      }
      .finisheddownlaod{
        font-size:3vw;
      }
    }`
    return(
        
        <div>
            <style>
                {css}
            </style>
            <header className="desktopnavbar">
                <img class ="logo"src={logo}/>
                <nav>
                    <a href="/" className="navhome">Home</a>
                    <a href="/reload" className="navreload">Reload</a>
                    <a href="https://youtu.be/OwvdhqWKS9U" className="navreload">Tutorial</a>
                    <a href="/signout" className="navsignout">Signout</a>
                </nav>
                <h1 className="credits">credits: {credits}</h1>
            </header>
            <header className="mobilenavbar">
              <div className="menubox"> 
                <img class ="menu"src={menu} onClick={toggleMenu}/>
                <img class ="logo"src={logo}/>
              </div>
                <h1 className="credits">credits: {credits}</h1>
                {!toggle && (
                  <div className="menunav">
                    <img className="close" src={close} onClick={toggleMenu} />
                    <a href="/" className="navhome">
                      Home
                    </a><br></br>
                    <a href="/reload" className="navreload">
                      Reload
                    </a><br></br>
                    <a href="https://youtu.be/OwvdhqWKS9U" className="navreload">
                      Tutorial
                    </a><br></br>
                    <a href="/signout" className="navsignout">
                      Signout
                    </a><br></br>
                    
                  </div>
                )}
            </header>
            <div className="container">
                <div className="startandnow">
                    <div className="start">
                        <form action="" onSubmit={submite}>
                        <h1 className="starttext">Start a Search</h1>
                        <h2 className="searchTermtext">Search Term (one per search):</h2>
                        <input class = "searchTerm" id="searchTerm"type="text" title="searchTerm" placeholder="Ex: Restaurants, Painters, etc."  required/><br />
                        <h2 className="locationtext">Location:</h2>
                        <input class = "location" id="location" type="text" title="location" placeholder="Format: Street(Optional), City, State, Country"  required/><br />
                        <button class = 'startbutton' type="submit"><span className="startbuttontext">start</span></button>
                        </form>
                    </div>
                    <div className="current">
                        <h1 className="runningnow">Running Now (Limit 5)</h1>
                        <CurrentCsvs/>
                    </div>
                </div>
                <div className="finishedbox">
                    <div className="finished">
                        <h1 className="finishedtext">Finished Runs</h1>
                        <FinishedCsvs/>
                    </div>
                </div>
            </div>
            <div className="footer">
              <h1 className="feedback">Send Feedback Or Questions to <a className="feedbackemail"href = "mailto: support@localemail.app">support@localemail.app</a></h1>
            </div>
        </div>
    )
}
export default Home;