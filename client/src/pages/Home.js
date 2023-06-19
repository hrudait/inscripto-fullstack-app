import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";


function Home(){
    const authHeader = useAuthHeader()
    const authUser = useAuthUser()
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
    function checkout(e){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,{username:authUser().username})
        .then((res)=>{
            window.location = res.data
        })
    }
    function submit(e){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/run`,{username:authUser().username,url:e.target.elements.url.value})
    }
    return(
        <div>
            <h1>Home Page</h1>
            <form onSubmit={submit}>
                <input id = "url" type="url" title="url" placeholder="url"  required/><br />
                <button type="submit" className="btn">Submit</button><br />
            </form>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}
export default Home;