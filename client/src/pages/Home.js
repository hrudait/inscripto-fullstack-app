import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";


function Home(){
    const authHeader = useAuthHeader()
    const authUser = useAuthUser()
    useEffect(()=>{
        axios.get("https://backend-kn3o.onrender.com/auth",{headers:{"authorization":authHeader().substring(10)}})
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
        axios.post("https://backend-kn3o.onrender.com/create-checkout-session",{username:authUser().username})
        .then((res)=>{
            window.location = res.data
        })
    }
    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}
export default Home;