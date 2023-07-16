import { useState,useEffect } from "react"
import { Routes, Route , Navigate} from "react-router-dom";
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Reload from "./pages/Reload";
import SignOut from "./pages/SignOut";
import DNE from "./pages/DNE"
import { useIsAuthenticated, AuthProvider, RequireAuth, useSignOut } from "react-auth-kit";
import {BrowserRouter} from "react-router-dom"
import Forgot from "./pages/Forgot";
import Verify from "./pages/Verify";

function App() {
  return (
    <AuthProvider authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth loginPath={"/login"}><Home /></RequireAuth>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot" element={<Forgot />}/>
          <Route path="/verify" element={<Verify />}/>
          <Route path="/reload" element={<Reload />}/>
          <Route path="/register" element ={<Register />} />
          <Route path="/signout" element={<SignOut />}/>
          <Route path="*" element ={<DNE />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
