import { useState,useEffect } from "react"
function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(()=>{
    fetch("https://backend-kn3o.onrender.com/").then(
      response => response.json()
    ).then(
      data=>{
        setBackendData(data)
      }
    )
  },[])
  return (
    <div className="App">
      {(typeof backendData.bruh === 'undefined') ? (
        <h1>Loading...</h1>
      ):(
        <h1>{backendData.bruh}</h1>
      )
    }
    </div>
  );
}

export default App;
