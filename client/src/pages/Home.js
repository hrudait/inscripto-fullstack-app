import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import logo from './logo.svg'

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
    },[currentData])


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
        background-color: #363636;
      }
    .logo{
      width: 20vw;
      margin: 0;
    }
    .navbar{
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
      background-color: #363636;
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
      background-color: #363636;
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
      color: #363636;
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
      
    }`
    return(
        
        <div>
            <style>
                {css}
            </style>
            <header class="navbar">
                <img class ="logo"src={logo}/>
                <nav>
                    <a href="/" class="navhome">Home</a>
                    <a href="/reload" class="navreload">Reload</a>
                    <a href="/signout" class="navsignout">Signout</a>
                </nav>
                <h1 class="credits">credits: {credits}</h1>
            </header>
            <div class="container">
                <div class="startandnow">
                    <div class="start">
                        <form onSubmit={submite}>
                        <h1 class="starttext">Start a Search</h1>
                        <h2 class="searchTermtext">Search Term (one per search):</h2>
                        <input class = "searchTerm" id="searchTerm"type="text" title="searchTerm" placeholder="Ex: Restaurants, Painters, etc."  required/><br />
                        <h2 class="locationtext">Location:</h2>
                        <input class = "location" id="location" type="text" title="location" placeholder="Format: Street(Optional), City, State, Country"  required/><br />
                        <button class = 'startbutton' type="submit"><span class="startbuttontext">start</span></button>
                        </form>
                    </div>
                    <div class="current">
                        <h1 class="runningnow">Running Now (Limit 5)</h1>
                        <CurrentCsvs/>
                    </div>
                </div>
                <div class="finishedbox">
                    <div class="finished">
                        <h1 class="finishedtext">Finished Runs</h1>
                        <FinishedCsvs/>
                    </div>
                </div>
            </div>
            <div className="footer">
              <h1 class="feedback">Send Feedback Or Questions to <a class="feedbackemail"href = "mailto: support@localemail.app">support@localemail.app</a></h1>
            </div>
        </div>
    )
}
export default Home;