import { useEffect, useState } from "react"
import {useAuthUser, useAuthHeader} from 'react-auth-kit'
import axios from 'axios'
function Reload(){
    const [credits, setcredits] = useState();
    const auth = useAuthUser()
    const authHeader = useAuthHeader()
    const user = auth()
    useEffect(()=>{
        axios.get("https://backend-kn3o.onrender.com/auth",{headers:{"authorization":authHeader().substring(10)}})
        .then((res)=>{
            if(!(res.data===user.username)){
                window.location.href = "/signout" 
            }
        })
        .catch((e)=>{            
            window.location.href = "/signout"           
        })
    },[])
    //get the user credits
    useEffect(()=>{
        axios.post("https://backend-kn3o.onrender.com/getUser",{username:user.username})
        .then((res)=>{
            setcredits(res.data.credits)
        })
    },[])
    function handleChange(event){
        let value = event.target.value;
    
        // Remove non-numeric and non-decimal characters
        value = value.replace(/[^0-9.]/g, '');       
        // Remove decimal points
        value = value.replace(/(\.*)\./g, '$1');        
        // Update the input value
        event.target.value = value;
    }
    function next(number){
        axios.post("https://backend-kn3o.onrender.com/checkout",{username:user.username,amount:number})
        .then((res)=>{
            window.location = res.data
        })
    }

    function nextInput(event){
        event.preventDefault();
        next(parseInt(event.target.creditAmount.value))
    }
    return(
        <div>
            <h1>Current number of credits {credits}</h1>
            <div className="choose">
                <p>Choose an Amount</p>
                <button onClick={()=>next(5)}>5 credits</button>
                <button onClick={()=>next(10)}>10 credits</button>
                <button onClick={()=>next(25)}>25 credits</button>
                <button onClick={()=>next(50)}>50 credits</button>
                <button onClick={()=>next(100)}>100 credits</button>
                <p>Or Choose a number</p>
                <form onSubmit={nextInput}>
                    <input name = "creditAmount" type="text"  onInput={handleChange} />
                    <button type="submit">Checkout</button>
                </form>
            </div>
        </div>
        
    )
}
export default Reload;