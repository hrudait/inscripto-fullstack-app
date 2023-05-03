import { useState,useEffect } from "react"
function App() {
  const [backendData, setBackendData] = useState([{}])

  // useEffect(()=>{
  //   fetch("https://backend-kn3o.onrender.com/").then(
  //     response => response.json()
  //   ).then(
  //     data=>{
  //       setBackendData(data)
  //     }
  //   )
  // },[])
  return (
    <div className="App">
      <h1>
        EHhehe
      </h1>
    </div>
  );
}

export default App;
