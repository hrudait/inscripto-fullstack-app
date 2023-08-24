import axios from "axios";
import { useEffect, useState } from "react";
import logo from '../images/logo.svg'
import arrow from '../images/arrow.svg'
import checkmark from '../images/checkmark.svg'
import download from '../images/download.svg'
import hamburger from '../images/hamburger.svg'
import home from '../images/Home.svg'
import logout from '../images/Logout.svg'
import glass from '../images/Magnifying.svg'
import pageleft from '../images/page left.svg'
import pageright from '../images/page right.svg'
import plusbutton from '../images/PlusButton.svg'
import stage0 from '../images/stage0.svg'
import stage1 from '../images/stage1.svg'
import stage2 from '../images/stage2.svg'
import stage3 from '../images/stage3.svg'
import stage4 from '../images/stage4.svg'
import timer from '../images/Timer.svg'
import tutorial from '../images/Tutorial.svg'
import wallet from '../images/wallet.svg'
import {auth} from './firebase'

function Home(){
    const [credits, setcredits] = useState();
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1)
    const [currentData, setcurrent] = useState();
    const [finishedData, setfinished] = useState();
    const [email, setEmail] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [numCurrent, setNumCurrent] = useState(0);
    const [hideLeft, setHideLeft] = useState(true);
    const [hideRight, setHideRight] = useState(true);
    const [showCurrent, setShowCurrent] = useState(true);
    const [showFinished, setShowFinished] = useState(true);
    const [username, setUsername] = useState()


    //set the auth email and wait until it is set to run the getCredits,Current and Finished methods
    auth.onAuthStateChanged((user)=>{
      if(!user){
        window.location.href ='/login' 
      }
      else if(!email){
        setEmail(user.email)
        setUsername(user.displayName)
      }
    }) 
    useEffect(()=>{
      if(email){
        getCredits()
        getCurrent()
        getFinished()
      }  
    },[email])
    
    //get users credits
    function getCredits(){
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/getUser`,{email:email})
      .then((res)=>{
          setcredits(res.data.credits)
      })
    }

    //todo:check if the user is verified if they are not put up a popup that says get 5 free uses on phone verification


    function submite(e){
        if(credits===0){
            alert("Not enough credits, please reload")
        }
        else{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/getCurrentCsvAmount`,{email:email})
            .then((res)=>{
                if(parseInt(res.data,10)>=5){
                    alert('Too many requests')
                    return
                }
            })
            
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/run`,{email:email,searchTerm:e.target.elements.searchTerm.value,location:e.target.elements.location.value})
            .then(()=>{
                getCurrent()
                getFinished()
                getCredits()
                e.target.reset();
            })
        }
    }
    
    function getCurrent(){
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/getCurrent`,{email:email})
      .then((res)=>{
          setcurrent(res.data)
      })
    }

    function getFinished(){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getFinished`,{email:email,page:page})
        .then((res)=>{
            const list = res.data
            const numOfCsvs = list.pop()
            setCompleted(numOfCsvs)
            if(numOfCsvs==0){
              setMaxPages(1)
            }
            else if(numOfCsvs%5==0){
              setMaxPages(Math.floor(numOfCsvs/5))
            }
            else{
              setMaxPages(Math.floor(numOfCsvs/5)+1)
            }
            setfinished(list)
        })
    }

    function CurrentCsvs(){
        if(!currentData){
            return(<div></div>)
        }
        if(!showCurrent){
          return(<div></div>)
        }
        return(
            <div>
                {
                    currentData.map( csvitem => (
                        <div className="currentitem" key={csvitem.id}>
                          <div className="searchitems">
                              <span className="search-item-info search-item-top">Search term: <span className="search-item-data">{csvitem.name}</span></span>
                              <span className="search-item-info">Location: <span className="search-item-data">{csvitem.location}</span></span>
                          </div>
                            {csvitem.status === 0 ? (
                              <div className="progress">
                                <span className="status">initiated...</span>
                                <img className="stage" src={stage0} />
                              </div>
                            ) : csvitem.status === 1 ? (
                              <div className="progress">
                                <span className="status">finding businesses...</span>
                                <img className="stage" src={stage1} />
                              </div>
                            ): csvitem.status === 2 ?(
                              <div className="progress">
                                <span className="status">scraping websites...</span>
                                <img className="stage" src={stage2} />
                              </div>
                            ): csvitem.status === 3 ?(
                              <div className="progress">
                                <span className="status">verifying emails...</span>
                                <img className="stage" src={stage3} />
                              </div>
                            ):(
                              <div className="progress">
                                <span className="status">uploading csv...</span>
                                <img className="stage" src={stage4} />
                              </div>
                            )}
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
      if(email){
        getCurrent();
        getFinished();
        getCredits()
      }
    }, [page]);
    
    function decPage(){
        setPage(page-1)
    }

    function FinishedCsvs(){
        if(!finishedData){
            return(<div></div>)
        }
        if(!showFinished){
          return(<div></div>)
        }
        setHideLeft(page===1)
        setHideRight(maxPages===page)
        return(
            <div>
                {
                    finishedData.map( csvitem => (
                        <div className="currentitem" key={csvitem.id}>
                        <div className="searchitems">
                            <span className="search-item-info search-item-top">Search term: <span className="search-item-data">{csvitem.name}</span></span>
                            <span className="search-item-info">Location: <span className="search-item-data">{csvitem.location}</span></span>
                        </div>
                        {csvitem.status===-1?(<div className="progress">
                            <span className="refund">Search Failed, Credit Refunded</span>
                        </div>):(
                            <div className="progress">
                              <img className="download" src={download} onClick={()=>window.open(csvitem.url)} />
                           </div>
                        )}
                    </div>
                    ))
                }
            </div>
        )
    }
    //check every 30 seconds for updates to the currentData, ie for when the csv's finish
    //only when currentData has a value
    useEffect(() => {
      if (currentData) {
        const intervalone = setInterval(getCurrent, 10000);
        const intervaltwo = setInterval(getFinished, 10000);
  
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
    const css =`
    *{
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
  }
  body{
      background-color: #3D3D3E;
      height:100vh;
      width:100vw;
      margin: 0;
      padding: 0;
      box-sizing: content-box;
      overflow-x: hidden;
  }
  .header{
      display: flex;
  }
  .mobile-header{
      display: none;
  }
  
  .img{
      display: inline;
  }
  .one{
      width: 40vw;
      display: flex;
  }
  .three{
      width: 40vw;
      display: flex;
      align-items: right;
      justify-content: right;
  }
  .two{
      width: 20vw;
      text-align: center;
      color: white;
      font-family: 'Chakra Petch';
      font-weight: 500;
      font-size: 2.5rem;
      padding-top: 2.25vw;
  }
  .desktoplogo{
      width: 20vw;
      padding-left: 2vw;
      padding-top: 2vw;
  }
  .credit-container{
      display: flex;
      width: 30vw;
      padding-top: 1vw;
      justify-content: center;
      align-items: center;
  }
  .credits{
      color: #89CED8;
      font-family: 'Chakra Petch';
      padding-left: .25vw;
  }
  .wallet{
      height: 2vw;
  }
  .plus-button{
      padding-left: .75vw;
      height: 2vw;
  }
  nav{
      padding-top: 1vw;
      padding-right: 2vw;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .tutorial-href, .logout-href{
      color: white;
      text-decoration: none;
      font-family: 'Chakra Petch';
      padding-right: 1.5vw;
      font-size: 1.5rem;
  }
  .home-href{
      color: #89CED8;
      font-family: 'Chakra Petch';
      padding-right: 1.5vw;
      font-size: 1.5rem;
  }
  .tutorial, .home, .signout{
      height: 2vw;
      padding-right: .25vw;
  }
  .full-page-container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-top: 2vw;
      width: 100vw;
  }
  
  .search{
      width: 47vw;
      margin-left:2vw;
      margin-right:1vw;
      border: black solid 3px;
      border-radius: .75vw;
      background-color: #3A3A3B;
  }
  .searchTitle{
      display: flex;
      align-items: center;
  }
  .glass{
      padding-left: 1vw;
      padding-top: 1vw;
  }
  .starttext{
      color: white;
      font-family: 'Chakra Petch';
      padding-left:.5vw;
      padding-top:.75vw;
      font-size: 2rem;
  }
  .creditcost{
      color: #89CED8;
      font-size: 1rem;
  }
  
  .searchTerm{
      display: block;
      margin-left: 1vw;
  }
  .location{
      margin-left: 1vw;
  }
  .input-label{
      font-family: 'Chakra Petch';
      color: white;
      display: block;
      padding-left: 1.5vw;
      margin-top: 1vw;
      margin-bottom: .25vw;
  }
  .top{
      margin-top: 1.5vw;
  }
  input{
      width: 35vw;
      height: 2.5vw;
      padding-left: .5vw;
      border: #EDEEC9 solid .25vw;
      border-radius: .5vw;
      font-family: "Sen";
      font-size: 1.25rem;
      color: black;
  }
  .input::placeholder{
      color: #B1B1B2;
  }
  input:focus{
      border-color:#574AE2 ;
      background-color: #DDDBF9;
      outline: none;
  }
  form{
      margin-bottom: 2.5vw;
  }
  .run{
      margin-left: 3vw;
      font-family: 'Chakra Petch';
      font-size: 1.25rem;
      padding: .5vw 1vw;
      background-color: #796EE8 ;
      color: white;
      border: black solid .175vw;
      border-radius: .75vw;
  }
  .current{
      width: 47vw;
      margin-left:2vw;
      margin-right:1vw;
      margin-top:2vw;
      border: black solid 3px;
      border-radius: .75vw;
      background-color: rgba(100,100,101,.4);
      margin-bottom: 1vw;
  }
  .currentTitle{
      display: flex;
      align-items: center;
      margin-bottom: 2vw;
  }
  .currenttext{
      color: white;
      font-family: 'Chakra Petch';
      padding-left:.5vw;
      padding-top:1vw;
      font-size: 2rem;
      width: 47vw;
  }
  .timer{
      padding-left: 1vw;
      padding-top: 1vw;
  }
  .queued{
      color: #89CED8;
      font-family: 'Chakra Petch';
      font-size:2rem;
      text-align: right;
      white-space: nowrap;
      padding-right: 1vw;
      padding-top: 1vw;
  }
  .currentItems{
      width: 44vw;
      margin: 0 auto;
  }
  .currentitem{
      background-color: #3A3A3B;
      width: 100%;
      border: solid black .125vw;
      margin-bottom: 1vw;
      border-radius: .5vw;
      display: flex;
  }
  .searchitems{
      padding: .5vw;
      width: 50%;
  }
  .search-item-info{
      color: #61BECB;
      display: block;
      font-family: 'Sen' ;
      font-size: 1rem;
  }
  .search-item-top{
      padding-bottom: .5vw;
  }
  .search-item-data{
      color: white;
  }
  .progress{
      display: flex;
      justify-content: right;
      align-items: center;
      width: 50%;
      padding-right: 1vw;
  }
  .status{
      color: #61BECB;
      font-family: 'Sen';
      font-size: 1rem;
      white-space: nowrap;
  }
  .finished{
      width: 47vw;
      margin-left:1vw;
      margin-right:2vw;
      border: black solid 3px;
      border-radius: .75vw;
      background-color: rgba(100,100,101,.4);
      margin-bottom: 1vw;
  }
  .finishedTitle{
      display: flex;
      align-items: center;
      margin-bottom: 2vw;
  }
  .completedtext{
      color: white;
      font-family: 'Chakra Petch';
      padding-left:.5vw;
      padding-top:1vw;
      font-size: 2rem;
      width: 47vw;
  }
  .checkmark{
      padding-left: 1vw;
      padding-top: 1vw;
  }
  .completed{
      color: #89CED8;
      font-family: 'Chakra Petch';
      font-size:2rem;
      text-align: right;
      white-space: nowrap;
      padding-right: 1vw;
      padding-top: 1vw;
  }
  .pages{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .pagebutton{
      height: 3vw;
  }
  .refund{
      font-family: 'Sen';
      color: red;
      font-size: 1rem;
  }
  .pagenum{
      padding: .5vw 1vw;
      margin: 0 .5vw;
      color: white;
      background-color: #796EE8;
      font-family: 'Sen';
      font-size: 2rem;
      border-radius: 200vw;
      border: black solid .2vw;
  }
  @media (orientation:landscape){
      .currentarrow{
          display: none;
      }
      .mobilesearch{
          display: none;
      }
      .bottom{
          display: inline;
      }
      .mobilemarginbottom{
          display: none;
      }
  }
  @media (orientation:portrait) {
      .header{
          display: none;
      }
      .mobile-header{
          display: flex;
      }
      .full-page-container{
          display: block;
      }
      .search, .current,.finished{
          width: 95vw;
          margin: 3vw auto;
          border-radius: 2vw;
          border-width: .5vw;
      }
      .currentTitle, .finishedTitle,.searchTitle{
          width: 95vw;
          display: flex;
      }
      .currenttext,.completedtext,.starttext{
          width: 95vw;
      }
      .queued, .completed{
          padding-top: 2vw;
          padding-right: 2vw;
      }
      .currentItems{
          width: 90vw;
      }
      .currentitem{
          border-radius: 2vw;
          border-width: .5vw;
      }
      .searchitems{
          padding:2vw;
          
      }
      .search-item-info{
          font-size: 2.25rem;
      }
      .download{
          height: 10vw;
      }
      .status{
          font-size: 2.25rem;
      }
      .stage{
          height:10vw;
      }
      .currentlimit{
          display: none;
      }
      .timer, .checkmark{
          height: 10vw;
          padding-left: 2vw;
          padding-top: 2vw;
      }
      .currenttext, .completedtext{
          font-size: 3rem;
          padding-left: 2vw;
          padding-top: 2vw;
      }
      .currentarrow{
          height:8vw;
          padding-right: 2vw;
          padding-top: 2vw;
      }
      .searchitems{
          width: 70%;
      }
      .progress{
          width: 30%;
      }
      .searchTitle{
          display: none;
      }  
      .mobilesearch{
          display: inline;
      }  
      .input-label{
  
      } 
      .searchTerm{
          width: 90vw;
          margin: 0 auto;
          height: 10vw;
          font-size: 2.5rem;
          border-radius: 2vw;
          border-width: .5vw;
          padding-left: 2vw;
      }
      .location{
          display: block;
          width: 90vw;
          margin: 0 auto;
          height: 10vw;
          font-size: 2.5rem;
          border-radius: 2vw;
          border-width: .5vw;
          padding-left: 2vw;
      }
      .input-label{
          padding-left: 5vw;
          font-size: 2rem;
      }
      .bottom{
          display: flex;
          width: 95vw;
          align-items: center;
          justify-content: space-between;
          padding-top: 2vw;
      }
      .mobilesearch{
          display: flex;
          align-items: center;
      }
      .glassmobile{
          height: 8vw;
          padding-left: 2.5vw;
      }
      .creditcost{
          font-size: 2rem;
          font-family: 'Chakra Petch';
      }
      .run{
          text-align: right;
          margin-right: 3vw;
          font-size: 3rem;
          padding: 1.5vw 3vw;
          border-width: .5vw;
          border-radius: 2vw;
      }
      .mobile-header{
          display: flex;
          justify-content: space-between;
      }
      .menuopen{
          height: 8vw;
          padding-top: 3vw;
          padding-left: 3vw;
          box-sizing: content-box;
      }
      .logo{
          padding-top: 2vw;
      }
      .wallet{
          height: 5vw;
      }
      .credits{
          font-size: 2rem;
          padding-left:1vw;
      }
      .plus-button{
          height: 5vw;
      }
      .pages{
          margin-bottom: 10vw;
      }
      .pagebutton{
          height: 10vw;
      }
      .pagenum{
          font-size: 4rem;
          padding: 2vw 4vw;
          border-width: .5vw;
      }
      .refund{
          font-size: 2rem;
      }
  }
    `
    return(
        
        <div>
            <style>
                {css}
            </style>
            <div className="header">
              <div className="one">
                  <img className="desktoplogo" src={logo}/>
                  <div className="credit-container" onClick={()=>window.location.href='/reload'}>
                      <img className="wallet" src={wallet}/>
                      <span className="credits">{credits} credits</span>
                      <img className="plus-button" src={plusbutton} />
                  </div>
              </div>
              <h1 className="two">
                  Welcome, {username}.
              </h1>
              <div className="three">
                  <nav>
                      <img src={home} className="home" onClick={()=>window.location.href='/'} /><a href="/" className="home-href">Home</a>
                      <img src={tutorial} className="tutorial" /><a href="/register" className="tutorial-href">Tutorial</a>
                      <img src={logout} className="signout" onClick={()=>window.location.href='/signout'} /><a href="/signout" className="logout-href">Logout</a>
                  </nav>
              </div>  
          </div>
          <div className="mobile-header">
              <img className="menuopen" src={hamburger}/>
              <div>
                  <img className="logo" src={logo} />
                  <div className="credit-container">
                      <img className="wallet" src={wallet}/>
                      <span className="credits">{credits} credits</span>
                      <img className="plus-button" src={plusbutton} />
                  </div>
              </div>
          </div>
          <div className="full-page-container">
              <div className="left-side">
                  <div className="search">
                      <div className="searchTitle">
                          <img className="glass" src={glass}/>
                          <span className="starttext">Start a search <span className="creditcost">&#40;-1 credit&#41;</span></span>
                      </div>
                      <form onSubmit={submite}>
                          <span className="input-label top">Search Term &#40;one per search&#41;</span>
                          <input className="searchTerm" id="searchTerm" placeholder="Ex: restaurants, painters, etc."/>
                          <span className="input-label">Location</span>
                          <input className="location" id="location" placeholder="Format: Zipcode/City, State, Country"/>
                          <div className="bottom">
                              <div className="mobilesearch">
                                  <img className="glassmobile" src={glass}/>
                                  <span className="creditcost">&#40;-1 credit&#41;</span> 
                              </div>
                              <button className="run" type="submit">search</button>
                          </div>
                      </form>
                  </div>
                  <div className="current">
                      <div className="currentTitle">
                          <img className="timer" src={timer}/>
                          <span className="currenttext">Running now <span className="creditcost currentlimit">&#40;limit: 5&#41;</span></span>
                          <span className="queued">{numCurrent}/5 queued</span>
                          <img className="currentarrow" onClick={()=>setShowCurrent(!showCurrent)} src={arrow}/>
                      </div>
                      <div className="currentItems">
                          <CurrentCsvs/>
                      </div>
                  </div>
              </div>
              <div className="finished">
                  <div className="finishedTitle">
                      <img className="checkmark" src={checkmark}/>
                      <span className="completedtext">Completed runs</span>
                      <span className="completed">{completed} completed</span>
                      <img className="currentarrow" onClick={()=>setShowFinished(!showFinished)} src={arrow}/>
                  </div>
                  <div className="currentItems">
                      <FinishedCsvs/>
                  </div>
                  {showFinished ? (
                      <div className="pages">
                        {hideLeft ? null :<img className="pagebutton" onClick={()=>decPage()} src={pageleft}/>}
                        <button className="pagenum">1</button>
                        {hideRight ? null :<img className="pagebutton" onClick={()=>incPage()} src={pageright}/>}
                    </div>
                  ):null}
              </div>
              <div className="mobilemarginbottom">

              </div>
          </div>
        </div>
    )
}
export default Home;