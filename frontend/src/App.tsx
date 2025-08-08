import { Routes,Route } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"
import Topbar from "./components/Topbar"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

function App() {
  return (
    <>
    <Topbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}/>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
    </Routes>
    </>
  )
}

export default App
