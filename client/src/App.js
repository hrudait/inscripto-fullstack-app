import { useState,useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  // const [backendData, setBackendData] = useState([{}])

  // useEffect(()=>{
  //   //https://backend-kn3o.onrender.com/
  //   fetch("http://localhost:5000/").then(
  //     response => response.json()
  //   ).then(
  //     data=>{
  //       setBackendData(data)
  //     }
  //   )
  // },[])
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element ={<Login />} />
    <Route path="*" element ={<h1>DNE</h1>} />
  </Routes>
}

export default App;
