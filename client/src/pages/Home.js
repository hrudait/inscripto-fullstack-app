import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";


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
                window.location.href = "/signout" 
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

    function checkout(e){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,{username:user.username})
        .then((res)=>{
            window.location = res.data
        })
    }

    function submit(e){
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
        if(!currentData){
            return(<div></div>)
        }
        return(
            <div>
                {
                    currentData.map( csvitem => (
                        <div key={csvitem.id}>
                            <p>Search Term {csvitem.name}</p>
                            <p>Location {csvitem.location}</p>
                        </div>
                    ))
                }
            </div>
        )
    }

    function incPage(){
        setPage(page+1)
        getCurrent()
        getFinished()
    }
    function decPage(){
        setPage(page-1)
        getCurrent()
        getFinished()
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
                        <div key={csvitem.id}>
                            <p>Search Term {csvitem.name}</p>
                            <p>Location {csvitem.location}</p>
                            <a href={csvitem.url}>CSV Download</a>
                        </div>
                    ))
                }
                <div>
                {hideLeftA ? null : <span id="lefta" onClick={()=>decPage()}>&lt;</span>}
                <span>{page}</span>
                {hideRightA ? null : <span id="righta" onClick={()=>incPage()}>&gt;</span>}
                    
                </div>
            </div>
        )
    }

    return(
        <div>
            <h1>Home Page</h1>
            <h1>Current number of credits {credits}</h1>
            <button onClick={reload}>Reload Credits</button>
            <form onSubmit={submit}>
                <label for='searchTerm'>Search Term &#40;Just the type of business you are looking for&#41;</label>
                <br></br>
                <input id = "searchTerm" type="text" title="searchTerm" placeholder="Ex: restaurants"  required/><br />
                <label for='location'>Location</label>
                <br></br>
                <span>Format: Street&#40;Optional&#41;, City, State, Country</span>
                <br></br>
                <input id = "location" type="text" title="Location" placeholder="Ex: Seattle, WA, USA"  required/><br />
                <button type="submit" className="btn">Submit</button><br />
            </form>
            <div>
                <h1>Currently Running(Limit of 5)</h1>
                <CurrentCsvs/>
            </div>
            <div>
                <h1>Finished Runs</h1>
                <FinishedCsvs/>
            </div>
        </div>
    )
}
export default Home;