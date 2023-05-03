import { useState,useEffect } from "react"
function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(()=>{
    fetch("http://localhost:5000/").then(
      response => response.json()
    ).then(
      data=>{
        setBackendData(data)
      }
    )
  },[])
  return (
    <div className="App">
      <h1>
        {backendData.bruh}
      </h1>
    </div>
  );
}

export default App;
