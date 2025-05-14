// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import {SubHeading} from "./components/SubHeading"
import { InputBox } from './components/InputBox'
import { Button } from './components/Button'
import { BottomWarning } from './components/BottomWarning'
import { Signup } from './pages/Signup'

function App() {


  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter> */}
      <SubHeading label={"Enter your information to create an account"}/>
      <InputBox label={"First Name"} placeholder={"Kalpesh"} />
      <Button onClick={() => {}} label={"Sign up"} />
      <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to="/signin" />
      <Signup />
    </>
  )
}

export default App
