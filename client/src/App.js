import { Routes, Route , Navigate} from "react-router-dom";
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Reload from "./pages/Reload";
import SignOut from "./pages/SignOut";
import DNE from "./pages/DNE"
import Verified from "./pages/Verified";
import {BrowserRouter} from "react-router-dom"
import Forgot from "./pages/Forgot";
import Verify from "./pages/Verify";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot" element={<Forgot />}/>
          <Route path="/verify" element={<Verify />}/>
          <Route path="/verified" element={<Verified />}/>
          <Route path="/reload" element={<Reload />}/>
          <Route path="/register" element ={<Register />} />
          <Route path="/signout" element={<SignOut />}/>
          <Route path="*" element ={<DNE />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
